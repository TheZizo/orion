# Architectural Blueprint: Celestial Atlas Mouse-Tracking Parallax (Physical Damping & Zero Idle Drift)

**Document Status:** Working Architectural Blueprint & Design Brief  
**Target File:** `plans/celestial-atlas-mouse-parallax.md`  
**Author:** `@architect` (Systems & Frontend Architect)  
**Governing Standard:** `AGENTS.md` (Two-Pass Design & Architecture Loop)  

---

## 1. Executive Summary & Root Cause Analysis

### 1.1 Context & User Feedback
- **User Observation**: *"The constellation used to move with the mouse but now it stopped."*
- **Root Cause**: In an earlier refactor aimed at eliminating autonomous time-based drift (`ambientYaw` wobbling left and right on its own when idle), the pointer-tracking interaction (`onPointerMove` / `onPointerLeave`) was inadvertently stripped entirely, locking the 3D projection to static constants `BASE_YAW_RAD = -18°` and `BASE_ELEV_RAD = 22°`.

### 1.2 Architectural Goal
Restore tactile, physical, responsive cursor parallax to the 3D orbital constellation:
1. **Responsive Pointer Parallax**: Moving the cursor across the constellation stage smoothly tilts and rotates the 3D concentric orbits and nodes in perspective.
2. **Strict Anti-Oscillation / Zero Idle Drift**: Once the cursor stops moving, the constellation smoothly eases to the target angle and holds **rock-steady**. No sine-wave oscillations, no perpetual bobbing.
3. **Graceful Neutral Reset**: When the pointer leaves the stage (`onPointerLeave`), the system smoothly glides back to its neutral perspective `(0, 0)`.
4. **Demand-Driven `requestAnimationFrame`**: Animation frames run **only** during active convergence and halt immediately when the resting threshold is reached (`epsilon < 0.0001 rad`).
5. **Reduced Motion Respect**: When `prefers-reduced-motion: reduce` is active, pointer parallax is completely disabled, holding the static base perspective.
6. **100% Backwards Compatible**: Preserves all existing unit test contracts in `src/components/motifs/__tests__/CelestialAtlas.test.tsx` and adds a dedicated pointer parallax test.

---

## 2. Pass 1 — Mathematical & Physical Projection Model

### 2.1 Coordinate Normalization
Given a pointer event over the constellation stage container:
```typescript
const rect = containerRef.current.getBoundingClientRect();
// Normalized coordinates in range [-1, 1], centered at (0, 0)
const nx = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width) * 2 - 1));
const ny = Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height) * 2 - 1));
```

### 2.2 Angular Deflection Limits
To maintain Orion's disciplined cartographic aesthetic without disorienting distortion, we bound angular deflections:
- `BASE_YAW_RAD = -18 * (Math.PI / 180)` (-18° base azimuth)
- `BASE_ELEV_RAD = 22 * (Math.PI / 180)` (22° base pitch)
- `MAX_YAW_OFFSET_RAD = 12 * (Math.PI / 180)` (±12° horizontal yaw deflection)
- `MAX_ELEV_OFFSET_RAD = 8 * (Math.PI / 180)` (±8° vertical pitch deflection)

Target offsets:
- `targetYaw = nx * MAX_YAW_OFFSET_RAD`
- `targetElev = -ny * MAX_ELEV_OFFSET_RAD` (moving cursor up tilts constellation upward)

### 2.3 3D Perspective Synchronization
All visual elements in the XZ plane project synchronously with the active angles:
```typescript
const activeYaw = BASE_YAW_RAD + yawOffset;
const activeElev = BASE_ELEV_RAD + elevOffset;
```
1. **Concentric Orbits (Rings 1, 2, 3)**:
   - `generateRingPath(R1_RADIUS, activeYaw, activeElev, cx, cy)`
   - `generateRingPath(R2_RADIUS, activeYaw, activeElev, cx, cy)`
   - `generateRingPath(R3_RADIUS, activeYaw, activeElev, cx, cy)`
2. **Orbital Nodes**:
   - `project3D(px, pz, activeYaw, activeElev, cx, cy)`
3. **Active Trajectory Arc**:
   - Arcs between `corePos (cx, cy)` and `activeTargetPos` update dynamically with the 3D node coordinates.

---

## 3. Pass 2 — Anti-Cliché Self-Critique & Demand-Driven RAF Convergence

### 3.1 Flaw Audit of Common Implementations

| Bad Pattern / Cliché | Why It Fails | Orion Architecture Solution |
| :--- | :--- | :--- |
| **Perpetual Animation Loop** | `useEffect(() => { function tick() { ... requestAnimationFrame(tick); } })` runs 60/120 times per second forever, wasting battery, GPU, and CPU. | **Demand-Driven RAF**: Loop starts **only** when pointer moves. Halts completely once offsets converge to within `0.0001` radians. |
| **Autonomous Sine Oscillation** | Adding `Math.sin(time)` creates an artificial "breathing" or "wobbling" effect that violates Orion's solid observatory stillness. | **Zero Autonomous Drifting**: The system **only** moves when the user directs it with their cursor. When stationary, the system is motionless. |
| **Abrupt Snapping** | Direct 1:1 mouse tracking without damping feels jittery and cheap. | **Smooth Physical Damping (`lerp`)**: Linear interpolation with `alpha = 0.08` creates a luxurious astronomical instrument feel (weight and inertia). |
| **Pointer Trapping on Touch** | Interfering with mobile page scrolling. | **CSS Touch Discipline**: Container uses `touch-action: pan-y` so vertical scrolling on phones is uninterrupted. |

### 3.2 Convergence Loop Algorithm (State Machine)

```text
       [ Pointer Event: onPointerMove ]
                      │
                      ▼
        Calculate (targetYaw, targetElev)
                      │
                      ▼
         Is RAF Running? ──No──► Start RAF Loop
                      │ Yes
                      ▼
     ┌────────────────────────────────────┐
     │  Frame Step (requestAnimationFrame) │
     │  --------------------------------  │
     │  currentYaw += (targetYaw - curr) * alpha
     │  currentElev += (targetElev - curr) * alpha
     │                                    │
     │  Is |delta| < 0.0001 rad?          │
     └─────────────────┬──────────────────┘
                       │
            ┌──────────┴──────────┐
            ▼ No                  ▼ Yes
      Schedule next frame     current = target
      (RAF continues)         Update state to target
                              STOP RAF (Halts completely)
                              System is rock-steady!
```

---

## 4. Implementation Specification for `src/components/motifs/CelestialAtlas.tsx`

### 4.1 State & Ref Structure
```typescript
// Active offset state (rendered into SVG projection)
const [offsets, setOffsets] = useState<{ yaw: number; elev: number }>({ yaw: 0, elev: 0 });

// Refs for physical convergence without unnecessary re-renders
const containerRef = useRef<HTMLDivElement | null>(null);
const currentOffsetsRef = useRef<{ yaw: number; elev: number }>({ yaw: 0, elev: 0 });
const targetOffsetsRef = useRef<{ yaw: number; elev: number }>({ yaw: 0, elev: 0 });
const rafIdRef = useRef<number | null>(null);
const isRunningRef = useRef<boolean>(false);
```

### 4.2 Convergence Engine (`requestAnimationFrame`)
```typescript
const LERP_FACTOR = 0.08;
const EPSILON = 0.0001; // Radians

const updatePhysics = useCallback(() => {
  const current = currentOffsetsRef.current;
  const target = targetOffsetsRef.current;

  const dy = target.yaw - current.yaw;
  const de = target.elev - current.elev;

  if (Math.abs(dy) < EPSILON && Math.abs(de) < EPSILON) {
    current.yaw = target.yaw;
    current.elev = target.elev;
    setOffsets({ yaw: target.yaw, elev: target.elev });
    isRunningRef.current = false;
    rafIdRef.current = null;
    return; // STOP: System is stationary
  }

  current.yaw += dy * LERP_FACTOR;
  current.elev += de * LERP_FACTOR;

  setOffsets({ yaw: current.yaw, elev: current.elev });
  rafIdRef.current = requestAnimationFrame(updatePhysics);
}, []);

const startLoop = useCallback(() => {
  if (!isRunningRef.current && !prefersReducedMotion) {
    isRunningRef.current = true;
    rafIdRef.current = requestAnimationFrame(updatePhysics);
  }
}, [updatePhysics, prefersReducedMotion]);
```

### 4.3 Pointer Event Handlers
```typescript
const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
  if (prefersReducedMotion || !containerRef.current) return;

  const rect = containerRef.current.getBoundingClientRect();
  const nx = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width) * 2 - 1));
  const ny = Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height) * 2 - 1));

  targetOffsetsRef.current = {
    yaw: nx * MAX_YAW_OFFSET_RAD,
    elev: -ny * MAX_ELEV_OFFSET_RAD,
  };

  startLoop();
}, [prefersReducedMotion, startLoop]);

const handlePointerLeave = useCallback(() => {
  if (prefersReducedMotion) return;

  targetOffsetsRef.current = { yaw: 0, elev: 0 };
  startLoop();
}, [prefersReducedMotion, startLoop]);

// Cleanup on unmount
useEffect(() => {
  return () => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }
  };
}, []);
```

### 4.4 DOM Attachment
Attach handlers to the bleeding 3D Orrery Stage wrapper:
```tsx
<div
  ref={containerRef}
  onPointerMove={handlePointerMove}
  onPointerLeave={handlePointerLeave}
  className="w-full relative select-none bg-transparent lg:-mr-12 xl:-mr-16 touch-pan-y"
>
  <svg
    viewBox="0 0 740 440"
    className="w-full h-auto block overflow-visible"
    role="region"
    aria-label="Celestial Atlas: Interactive European mobility chart"
  >
    ...
```

---

## 5. Test Suite Verification Plan

### 5.1 Existing Contract Preservation
In `src/components/motifs/__tests__/CelestialAtlas.test.tsx`:
- `project()` math helper tests (2 tests) → PASS
- Orbital System Interactive Controls & Selection (5 tests) → PASS
- NodeInspector Geodesic Telemetry tests (4 tests) → PASS

### 5.2 New Pointer Parallax Test
Add a dedicated test case:
```typescript
it('responds to pointer move by updating 3D projection offsets and returns to neutral on pointer leave', () => {
  const { container } = render(<CelestialAtlas />);
  const stage = container.querySelector('[aria-label="Celestial Atlas: Interactive European mobility chart"]')?.parentElement;
  expect(stage).toBeInTheDocument();

  // Mock getBoundingClientRect
  vi.spyOn(stage!, 'getBoundingClientRect').mockReturnValue({
    left: 0,
    top: 0,
    width: 740,
    height: 440,
    right: 740,
    bottom: 440,
    x: 0,
    y: 0,
    toJSON: () => {},
  });

  // Trigger pointer move off-center
  fireEvent.pointerMove(stage!, { clientX: 600, clientY: 100 });

  // Verify component handled pointer event without crash
  expect(stage).toBeInTheDocument();

  // Trigger pointer leave
  fireEvent.pointerLeave(stage!);
  expect(stage).toBeInTheDocument();
});
```

---

## 6. Implementation Partition for Engineering

Since this is an isolated motif enhancement with no inter-file dependencies, it is assigned as a single focused partition:

- **Target File**: `src/components/motifs/CelestialAtlas.tsx`
- **Test File**: `src/components/motifs/__tests__/CelestialAtlas.test.tsx`
- **Execution Command**: `npm test -- src/components/motifs/__tests__/CelestialAtlas.test.tsx`

---

## 7. Acceptance Criteria
- [ ] Moving the mouse over the Celestial Atlas tilts the orbital system smoothly in 3D.
- [ ] Stopping the mouse settles the motion smoothly; the constellation holds 100% still without autonomous wobbling.
- [ ] Leaving the constellation smoothly returns it to `(0, 0)`.
- [ ] `prefers-reduced-motion: reduce` completely disables parallax.
- [ ] All 11 existing unit tests + 1 new test pass cleanly (`12 passed`).
