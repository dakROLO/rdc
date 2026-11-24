# RDC website delivery
Apply RDC Customer Website Delivery Guide v1.0 and the eight-question website brief.
Read docs/LAUNCH-RELEASE.md and docs/REDESIGN-RELEASE.md before changing environments.
Owner authorized a separately reviewed public launch release on November 23, 2026; never deploy the test package to production.
Production: node scripts/build-production.mjs; deploy dist through orange-grass workflow only after passing release validation.
Test: node scripts/build-static.mjs --test; deploy dist through salmon-flower test workflow. Noindex and sample-only portal.
Preserve rollback branches and prior findings. Keep private data, credentials, database scripts, internal docs, and live API code out of public dist.
Public intake is a request for discussion, not a complimentary demo entitlement. Price by complexity; private discounts via admin only.
Do not label client-side summaries as submitted inquiries.
Record actual builds, browser checks, URLs, revision, and remaining limitations.
