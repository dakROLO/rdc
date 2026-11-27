# RDC launch release — November 23, 2026

Public positioning and scope-based pricing are approved. Internal commercial eligibility and administration decisions are maintained in the private portal repository; they are not public release documentation.ng founding paid customers receive 35% off initial build only; free concept/assessment by personal invitation only. No blanket public entitlement. Prices indicative, complexity not page count. Private admin requirements: https://github.com/dakROLO/rdc-customer-portal/issues/6.

## Release boundary
Production package: node scripts/build-production.mjs. The review source is shared with the separate test package; production build rewrites test banners, canonical and indexing settings, price/offer wording, and customer workspace links. It deliberately excludes the sample workspace and old downloadable questionnaire. Test build stays noindex and sample-only. Do not deploy repository root, private source, credentials, internal docs or sample portal. Production action builds/validates on PR; deploy only from main. Existing live portal is unchanged. No payment activation or public claim of LLC/DBA registration before confirmation.

## Owner acceptance checklist
- [ ] Review homepage, services, pricing, privacy, about and workflow; starting prices and variable scope; no public free offer.
- [ ] On desktop and iPhone Safari verify layout, menu, keyboard focus, text contrast, links and 404.
- [ ] Run valid/invalid eight-question intake, review/edit/copy/download/email draft. Confirm no automatic receipt, no private records and no persistence on reload.
- [ ] Verify Bookings and professional email. Check email delivery manually.
- [ ] Team directory, member page, vCard, share, NFC and QR to permanent personal page. No prospect entitlement from a general card.
- [ ] Production version.json, sitemap, canonical, robots, CSP, actual 404, denied API, no sample portal. Test noindex and separate sample.
- [ ] Existing customer workspace link leads to portal hostname; verify authenticated admin and test customer in isolated environment; deny cross-organization access, unauthenticated APIs, unauthorized admin, verify blueprint writes and persistence. Do not merge portal PR #5 until this passes.
- [ ] Prospect/quote/NFC work per private issue; new admin features not part of public static release.
- [ ] Once Counto and ethics readiness confirmed, test tax, invoicing, deposit and recurring charges before live payment.

## Branch consolidation
Keep main as production and feature/operational-clarity-subsite as current test deployment branch until workflow retarget and test host verification. Keep rollback/pre-delivery-redesign-2026-11-08 and record actual pre-launch main SHA. Compare each feature branch to release head and main; do not delete any unique changes without review. After successful production and test smoke checks, remove only fully integrated transient branches. Do not remove rollback branch or private portal candidate with unvalidated changes. No force push or branch reset.

## Rollback
Record pre-release main SHA. Revert release commit on main or restore reviewed pre-release tree and workflow by new commit; deploy and smoke-test original public site. Existing portal and database remain unchanged. If new production workflow was deployed, restoring the old workflow restores original packaging. Never force-push or delete branches to recover.
## November 27 correction
Canonical public hostname is https://www.royaldigitalclarity.com. Apex domain must be bound to the same production Static Web App (or redirect with path/query preservation); DNS and custom-domain settings are separate from this repository. Do not use the bare hostname for NFC printing until both hosts are verified. Production package includes the pricing page and branded 404; desktop intake disclosure is inside the form, not a grid sibling. Portal appearance release has a separate authenticated deployment. Preserve all rollback refs until physical acceptance passes.
