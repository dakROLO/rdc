# RDC Connect — team directory and digital business cards

Updated November 19, 2026. Test release 2026.11.19-connect-team-r3.

## URL architecture

| URL | Purpose | NFC/QR target |
| --- | --- | --- |
| `https://royaldigitalclarity.com/connect/` | Public Meet the Team directory, multiple people over time | General RDC QR only |
| `https://royaldigitalclarity.com/connect/dakota/` | Dakota King's personal contact, booking and service landing page | **Dakota's personal NFC card and QR** |
| `https://royaldigitalclarity.com/connect/dakota/dakota-king.vcf` | Dakota's downloadable vCard | Save-contact button |
| `https://royaldigitalclarity.com/connect/dakota-king.vcf` | Historic vCard URL retained for backwards compatibility | Do not use for new cards |

The corresponding test URLs are `https://test.royaldigitalclarity.com/connect/` and `https://test.royaldigitalclarity.com/connect/dakota/`. Production `main` is not changed by this feature and is not verified to serve these paths. A physical NFC/QR should never encode the test URL.

**Migration decision**: The original personal page at `/connect/` becomes a team index. Anyone who previously encoded that URL into a physical card would now land on the team directory. Personal cards must encode the member URL (`/connect/dakota/`) instead. Both URLs are owned by RDC, not a card vendor.

## Implementation

- `connect/index.html` and `connect/team.css`: responsive, accessible team hub with one real verified member. Cards are laid out by reusable `.people-grid` and `.person-card` styles and will expand to multiple columns.
- `connect/dakota/index.html`: existing fully featured personal digital card preserved, now with team breadcrumb, direct download, contact, mail, Bookings and linked services.
- `connect/connect.css`: shared brand and profile styles; `connect/connect.js`: shares the current page's path rather than hardcoding the team directory, so new profile pages share correctly.
- `connect/dakota/dakota-king.vcf`: URL inside the vCard goes to the personal page, without unverified personal phone number.
- `scripts/build-static.mjs --test`: packs only the approved `connect` directory, enables `/connect` and `/connect/dakota` normalization, retains global CSP, `noindex`, API denial and portal isolation.

No tracking, forms backend, CRM, analytics, card-service redirect, or new third-party dependencies are added. Team biographies and roles reflect public owner-approved content only. No imaginary staff or empty profiles are published.

## Add a team member (repeatable process)

1. Get **explicit publication approval** for the person's name, preferred title, services, professional email, public photo and booking link. Do not include personal phone, home address, or private details by default.
2. Create `connect/<slug>/index.html` by copying the existing member-page layout. Update the unique slug, page title, meta description, canonical, Open Graph URL, portrait, profile copy, relevant CTAs and vCard download. Keep the team breadcrumb.
3. Add `connect/<slug>/<slug>.vcf` with the approved professional contact details and permanent `https://royaldigitalclarity.com/connect/<slug>/` URL. If no email or calendar is approved, remove those actions rather than leaving broken links.
4. Add an accessible `.person-card` in `connect/index.html` within `.people-grid`, using the same photo, role, focus tags and `Meet <name>` link. No visual placeholder employees.
5. Add a trailing-slash redirect for the person's exact path to the test build's static web app routing if necessary, and keep all public files in the explicit `connect` allowlisted directory.
6. Test on iPhone and Android: link, profile, vCard, share, calendar, email, keyboard navigation, mobile layout, noindex and CSP. Verify card scan on physical hardware. Review branch and deploy to test only.
7. Approve and explicitly promote the specific public files in a separate production release, with production metadata and security reviews. Never promote the sample-only portal as production.
8. After the production route is live, program the individual NFC and engraved QR to that permanent URL. Do not target the vendor profile or a staging hostname.

## Acceptance checklist

- `node scripts/build-static.mjs --test` passes, including safe `dist/connect/dakota/index.html` packaging
- Team index renders one Dakota profile (not invented employees) linking to the person page
- Dakota page keeps original personal card, photo, Save Contact button, Bookings, contact and service links
- Share action copies/shares the **page currently open**: team index on `/connect/`, Dakota card on `/connect/dakota/`
- Both slashless routes redirect to their canonical slash versions
- Direct vCard opens as contact on iOS and Android; no personal phone/unknown data
- No unapproved vendor requests, secrets, login/identity, telemetry, or customer data
- Test remains noindex; `main` and live customer portal unchanged
- Production remains a distinct reviewed release; production QR/NFC is **not** activated until it is live

## Rollback

Use a new commit that reverts the team-directory feature from `feature/operational-clarity-subsite` and let the test workflow redeploy. Preserve the original redesign rollback branch (`rollback/pre-delivery-redesign-2026-11-08`). This feature changes only static files and test build packaging, not databases, live identity, DNS or production. The full redesign release and rollback plan remains in `docs/REDESIGN-RELEASE.md`.
