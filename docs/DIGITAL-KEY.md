# RDC Digital Key — test feature, 2026-11-19

## Purpose
A mobile-first, first-party digital business card for Dakota King. NFC tap and a printed QR should both open the same **customer-owned URL** `https://royaldigitalclarity.com/connect/` after production approval. During design review, use `https://test.royaldigitalclarity.com/connect/`.

## Implementation
- `/connect/index.html`: branded page, photo, save-contact action, booking, service discovery, website intake and labeled sample workspace
- `/connect/connect.css`: standalone responsive styling aligned with the redesign's navy, blue and yellow palette; reduced-motion and keyboard-focus support
- `/connect/connect.js`: first-party share action (native share, copy fallback)
- `/connect/dakota-king.vcf`: vCard 3.0, name/company/email/website, no unverified personal phone
- `scripts/build-static.mjs --test`: explicit `connect` directory allowlist and `/connect` to `/connect/` redirect; same test-only CSP and noindex boundary

No analytics, forms, lead-storage backend, third-party fonts, card-vendor redirect, identity calls, tracking SDK, or user-data collection were added. Contact and email/Bookings links require the visitor's own action.

## Test checklist
1. Confirm `node scripts/build-static.mjs --test` succeeds and only new public files appear in `dist/connect`.
2. Visit `https://test.royaldigitalclarity.com/connect/` on an iPhone and desktop. Verify brand, photo, contrast, layout, tab order, reduced motion.
3. Verify `/connect` redirects to `/connect/`, and the 404 and API denial remain intact.
4. Download `dakota-king.vcf` on iPhone/Android, inspect contact name, business, email, website, and absence of a phone number.
5. Test Bookings, mailto, native share/copy fallback, service, website-intake and labeled portal sample links.
6. Confirm robots header/noindex, CSP, `version.json`, and no console/network errors.
7. Verify main production and the real portal remain unchanged.

## Promotion and card order
The QR and NFC chip **must point to the stable production URL**, not the test site or a vendor-hosted profile. DO NOT order/activate or share the QR publicly until production is approved, `/connect/` is deployed and tested, and any preview banner + `noindex` are removed for production. A future site change can update the contact information without reprinting the card.

Request one reusable custom NFC card (metal or acrylic), URL encoding to `https://royaldigitalclarity.com/connect/`, a scannable QR with the same destination, and no mandatory vendor profile or recurring plan. Test a sample before ordering a batch.

## Rollback
This feature does not touch production, customer data, schema, identity or DNS. Revert the feature commit(s) from the test deployment branch through a new commit, then verify the test workflow and no longer served `/connect/` route. Preserve `rollback/pre-delivery-redesign-2026-11-08`. This incremental change is independent of the full redesign rollback documented in `docs/REDESIGN-RELEASE.md`.

## Remaining work
- Verify deployment and actual physical iPhone/Android NFC + QR handoff.
- Approve public contact details/title and visual design.
- Explicitly promote public files and production CSP/metadata through a separate reviewed release; do not promote the sample portal.
- Optional future first-party privacy-respecting measurement requires an explicit retention and notice decision.
