# RDC brand refresh — Action 37 (2026-11-26)

Review in PR #6; do not merge until owner approval and checks pass.

## Current change
- `assets/rdc-pixel-d.svg`: approved clean Pixel D vector replaces the prior rough cropped mark. Existing SVG favicon references are retained.

## Remaining asset import
Exact approved raster files are in the conversation's RDC_Brand_Review_Import.zip. They have not been committed yet because the current connector cannot directly transfer the local binary files. Use the included Import-RdcBrand.ps1 on a clean clone of this release branch; it verifies hashes, copies files and runs the production build. Optional -CommitAndPush updates the same PR, not main.

- `assets/rdc-logo-luminous.png`: 680px-wide transparent web derivative of the approved precision logo.
- `assets/favicon.ico`, `assets/favicon.svg`, `assets/favicon-*.png`, `assets/apple-touch-icon.png`: final Pixel D package (not the superseded pixels-only package).
- `brand/print/`: exact 12-inch and 3.5-inch 300 DPI transparent PNGs. Keep outside public assets; production packaging should not expose print masters.
- `brand/RDC_D_favicon_preview.png`: review reference only.

Approved print master SHA256: dda19579d468eb1124f1d699f20acabbb94df9fa361cf7aadf1ec80f83f16840
Approved chest PNG SHA256: 5d35a2fc41a015c905cffb762addc9fb2daed688fd939ae4c7ebec9c733bf294

## Owner acceptance
- Compare updated header/footer at desktop/mobile widths; check image proportions.
- Inspect D steps, orange pixels and lower wordmark for artifacts.
- Verify SVG tab icon at 16/32 px; ICO fallback and Apple icon on supported browsers/devices; refresh cached favicon. Add explicit fallback/touch links where required.
- Review production package and test deployment separately. The current test branch and live private portal are not changed by this release-only commit; coordinate test preview via the existing workflow before production approval.
- Verify production build excludes brand print masters, repository docs and sample portal.
- No production merge or deploy without owner approval.
