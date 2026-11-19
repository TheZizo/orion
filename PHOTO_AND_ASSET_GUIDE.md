# Orion Platform — Photo & Asset Management Guide
A Non-Technical Guide to Managing Real Photos, Team Portraits, and Project Infopacks

Welcome to the Orion digital asset handbook. This guide is written for Orion project coordinators, youth workers, facilitators, and team members who want to update the website with authentic field photography and official Erasmus+ documentation for **Orion Fiatalok Informális Csoportja**.

No advanced programming knowledge is required. You will learn:
1. **The Quickest Way**: How to replace existing placeholder images in under two minutes with zero code.
2. **The Professional Way**: How to add new field photos to project galleries with photographer credits and dates.
3. **Team Portraits**: How to add core team headshots.
4. **Project Infopacks**: How to add or replace official youth exchange infopacks in `public/docs/infopacks/`.

---

## 1. Directory Overview

All website media lives inside the `public/` folder of this project. Everything placed in `public/` is served directly to website visitors.

```text
public/
├── docs/                                  # Official PDFs for download
│   └── infopacks/                         # Youth Exchange infopacks
│       └── the-financial-blueprint.pdf    # (Optional) Infopack for TFB
│
├── images/projects/                       # Core website images (placeholder root)
│   ├── debrecen-1.jpg                     # Lead photo: The Financial Blueprint
│   ├── reforest-1.jpg                     # Lead photo: ReForest (Planting)
│   ├── reforest-2.jpg                     # Photo 2: ReForest (Workshop circle)
│   └── reforest-3.jpg                     # Photo 3: ReForest (Mountain hike)
│
└── photos/                                # Real field photography archive
    ├── projects/
    │   ├── reforest/                      # Authentic photos from ReForest (Romania)
    │   └── the-financial-blueprint/       # Authentic photos from Financial Blueprint (Hungary)
    ├── team/                              # Square portraits of leadership & coordinators
    └── hq/                                # Debrecen workspace, hub, and strategy photos
```

---

## 2. Fast Track: Replace Existing Placeholders (Zero Code Required)

If you have real photos ready for **ReForest** or **The Financial Blueprint** and want to update the live site immediately without editing any code files:

1. Prepare your real photograph (see [Image Standards](#4-image-standards--recommended-specs) below).
2. Save your photo with the **exact filename** of the placeholder you want to replace:
   - `reforest-1.jpg` (main ReForest planting/field photo)
   - `reforest-2.jpg` (ReForest workshop/reflection photo)
   - `reforest-3.jpg` (ReForest trail/team photo)
   - `debrecen-1.jpg` (The Financial Blueprint lead photo)
3. Copy your photo into:
   ```text
   public/images/projects/
   ```
   Choose **Overwrite / Replace** when prompted by Windows Explorer or macOS Finder.
4. Refresh the website in your browser using `Ctrl + F5` (Windows) or `Cmd + Shift + R` (Mac) to bypass local caching.

That is all. The website immediately displays your real photo in all hero cards, project archive previews, and detail headers.

---

## 3. Adding New Photos to the Gallery Showcase

When you have a set of authentic photos from a project, follow this 3-step workflow to add them to the interactive documentary gallery.

### Step 1: Prepare and Save Your Photo Files

1. Export your photos from your phone, camera, or shared Drive in landscape orientation.
2. Compress each photo so the file size is under **350 KB** (see tools in [Section 4](#4-image-standards--recommended-specs)).
3. Name your file using lowercase letters, numbers, and hyphens (no spaces or special characters):
   - Example: `reforest-planting-01.jpg`
   - Example: `reforest-circle-02.jpg`
   - Example: `blueprint-workshop-01.jpg`
4. Copy the file into the appropriate folder under `public/photos/projects/`:
   - For ReForest: `public/photos/projects/reforest/`
   - For The Financial Blueprint: `public/photos/projects/the-financial-blueprint/`

### Step 2: Register the Photo in `src/lib/orionData.ts`

To display your new photo on the website, open `src/lib/orionData.ts` in any text editor (VS Code, Notepad, or GitHub's web editor).

Find the project you want to update inside `SEED_PROJECTS` (for example, the project with `slug: 'reforest'`). Look for its `gallery: [...]` list:

```typescript
    gallery: [
      {
        src: '/images/projects/reforest-1.jpg',
        alt: 'Youth participants planting saplings in the Transylvanian forest',
        caption: 'Community planting day above Lacu Roșu valley',
        category: 'Field Action',
        date: 'October 2026',
        location: 'Lacu Roșu, Transylvania',
        photographer: 'Asociația Agoje & Orion Fiatalok Informális Csoportja',
      },
      // ADD YOUR NEW PHOTO HERE
    ],
```

### Step 3: Copy-Paste Example Entry

Add a new block inside the `gallery` array separated by a comma. You can copy, paste, and adapt this exact template:

```typescript
      {
        src: '/photos/projects/reforest/reforest-planting-01.jpg',
        alt: 'Participants planting native fir saplings on the mountain slope',
        caption: 'Planting native fir saplings across the upper Harghita ridgeline',
        category: 'Field Action',
        date: 'October 2026',
        location: 'Lacu Roșu, Harghita, Romania',
        photographer: 'Orion Fiatalok Informális Csoportja',
      },
```

#### Field Explanations

| Property | What it does | Example |
| :--- | :--- | :--- |
| `src` | Path to the file inside `public/`. Always starts with `/`. | `'/photos/projects/reforest/reforest-planting-01.jpg'` |
| `alt` | Accessibility description for screen readers and search engines. | `'Group of youth planting young fir trees'` |
| `caption` | Narrative sentence displayed below the photo and in the Lightbox viewer. | `'Volunteers restoring alpine slopes above the red lake valley'` |
| `category` | Controls the filter buttons in the gallery. Use one of: `'Field Action'`, `'Workshops'`, or `'Community & Culture'`. | `'Field Action'` |
| `date` | Month and year when the photo was taken. | `'October 2026'` |
| `location` | City, venue, or region name. *(Never use latitude/longitude numbers)*. | `'Lacu Roșu, Harghita, Romania'` or `'Debrecen, Hungary'` |
| `photographer` | Credit for the youth participant, staff member, or partner organization. | `'Orion Fiatalok Informális Csoportja'` or `'Photo: Orion Archive'` |

---

## 4. Image Standards & Recommended Specs

To keep the Orion website fast on mobile networks while looking sharp on retina laptops and high-resolution monitors, adhere to these guidelines:

| Image Purpose | Recommended Dimensions | Aspect Ratio | Max File Size | File Format |
| :--- | :--- | :--- | :--- | :--- |
| **Project Gallery Photos** | `1800 × 1200 px` | `3:2` Landscape | `350 KB` | `.jpg`, `.jpeg`, or `.webp` |
| **Project Lead / Hero Banners** | `1920 × 1080 px` or `1920 × 820 px` | `16:9` or `21:9` Wide | `450 KB` | `.jpg`, `.jpeg`, or `.webp` |
| **Leadership Team Portraits** | `800 × 800 px` | `1:1` Square | `180 KB` | `.jpg` or `.webp` |
| **Headquarters & Workspace** | `1600 × 1000 px` | `16:10` Landscape | `300 KB` | `.jpg` or `.webp` |

### Recommended Free Tools for Resizing and Compression

You do not need Adobe Photoshop to prepare photos. These free tools run directly in any web browser:

1. **[Squoosh.app](https://squoosh.app)** *(Recommended)*:
   - Drag and drop your photo.
   - Under **Resize**, set **Width** to `1800` (height will scale automatically).
   - Under **Compress**, select **MozJPEG** with quality set to `80%` or **WebP** at `82%`.
   - Download the compressed image (usually reduces a 6 MB camera photo down to ~220 KB with zero visible loss in quality).
2. **[TinyJPG / TinyPNG](https://tinyjpg.com)**:
   - Great for fast batch compression of multiple photos at once.
3. **[Photopea](https://www.photopea.com)**:
   - A free in-browser editor if you need to crop images to a `3:2` or `1:1` ratio.

---

## 5. Adding Leadership Team Portraits

Team portraits are displayed in the leadership constellation grid on the About page.

1. Crop the member's photo to a square `1:1` aspect ratio (`800 × 800 px`).
2. Save the file into `public/photos/team/` using the person's name:
   - `public/photos/team/zeid-isaac.jpg`
   - `public/photos/team/roberta-szabo.jpg`
   - `public/photos/team/jazmin-szabo.jpg`
   - `public/photos/team/jordan-smith.jpg`
   - `public/photos/team/mehmet-ismail.jpg`
3. When team member photo fields are connected in `src/lib/orionData.ts`, reference `/photos/team/name.jpg`.

---

## 6. Project Infopacks & Institutional Information

### A. Partner Inquiries & Institutional Documentation
Orion Fiatalok Informális Csoportja handles consortium inquiries directly via email. Complete institutional partner dossiers, grant references, and legal paperwork are provided upon request to:
**`zeid@orionyouth.eu`**

### B. Adding Official Project Infopacks
When an official Erasmus+ project Infopack PDF is finalized for a youth exchange:

1. Save your completed project infopack as a PDF.
2. Name the file with the project slug:
   - For The Financial Blueprint: `the-financial-blueprint.pdf`
3. Copy the file into:
   ```text
   public/docs/infopacks/
   ```
4. Update `infopackUrl` in `src/lib/orionData.ts`:
   ```typescript
   infopackUrl: '/docs/infopacks/the-financial-blueprint.pdf',
   ```
5. The "Download Infopack" buttons throughout the site will automatically become active.

### Document Guidelines
- **File size**: Keep PDFs under **8 MB** so participants on mobile data can open them quickly.
- **Format**: Standard A4 format with selectable text (not scanned images of printed paper).

---

## 7. Quality Checklist Before Publishing

Before committing your changes to Git or opening a pull request, run through this quick checklist:

- [ ] **No coordinates**: Verify that `location` strings use real geographic descriptions (e.g. `Debrecen, Hungary` or `Lacu Roșu, Transylvania`), never latitude/longitude numbers.
- [ ] **Small file sizes**: All photos are under 350 KB and PDFs are under 8 MB.
- [ ] **Consistent naming**: Files use lowercase with hyphens (e.g. `action-01.jpg`), without spaces, accents, or special characters.
- [ ] **Valid paths**: All paths in code start with a forward slash (e.g. `/photos/projects/reforest/action-01.jpg`).
- [ ] **Alt text provided**: Every photo has a concise description so visitors using screen readers understand the scene.

---

## 8. Need Help?

If you encounter any issues with images not appearing:
1. **Check the file extension**: In Windows, a file might accidentally be named `photo.jpg.jpg` or `photo.PNG` (case-sensitive on production servers). Make sure it ends in lowercase `.jpg` or `.webp`.
2. **Hard reload**: Press `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac) to clear your browser's cached version of the image.
3. **Verify the path**: If the file is in `public/photos/projects/reforest/action-01.jpg`, the code reference must be `src: '/photos/projects/reforest/action-01.jpg'` (omit the word `public`).
