import { ImageResponse } from 'next/og';

export const alt =
  'Orion Fiatalok Informális Csoportja — Spark something bigger.';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0B132B',
          color: '#F8F9FA',
          padding: '64px 72px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Top Row: Star Motif & Organization Name */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '18px',
          }}
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 12 2 Q 12 12 22 12 Q 12 12 12 22 Q 12 12 2 12 Q 12 12 12 2 Z"
              fill="#E35619"
            />
          </svg>
          <div
            style={{
              fontSize: '24px',
              fontWeight: 600,
              color: 'rgba(248, 249, 250, 0.88)',
              letterSpacing: '-0.01em',
            }}
          >
            Orion Fiatalok Informális Csoportja
          </div>
        </div>

        {/* Center Hero Lockup */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <div
            style={{
              fontSize: '76px',
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#F8F9FA',
            }}
          >
            Spark something bigger.
          </div>
          <div
            style={{
              fontSize: '28px',
              lineHeight: 1.4,
              color: 'rgba(248, 249, 250, 0.78)',
              maxWidth: '920px',
            }}
          >
            An international youth initiative turning European participation
            into memories, growth, and human connection.
          </div>
        </div>

        {/* Bottom Metadata Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(248, 249, 250, 0.16)',
            paddingTop: '24px',
            fontSize: '20px',
            color: 'rgba(248, 249, 250, 0.7)',
          }}
        >
          <div>Debrecen, Hungary (47.53° N, 21.62° E) — Erasmus+ Youth Mobility</div>
          <div style={{ color: '#E35619', fontWeight: 600 }}>orionyouth.eu</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
