# RDC website delivery

Apply RDC Customer Website Delivery Guide v1.0 and the eight-question demo brief.
Read docs/REDESIGN-RELEASE.md before publishing or changing environments.
The current redesign is authorized for the existing test site only.
Production main and the live portal are not part of this promotion.
Preserve rollback/pre-delivery-redesign-2026-11-08 and prior findings.
Test packaging: node scripts/build-static.mjs --test.
Deploy only dist through the salmon-flower test workflow.
Keep private data, credentials, database scripts, internal docs, and real portal API code out of dist.
The public portal preview must remain sample-only with no live identity/API calls.
Do not label client-side summaries as submitted inquiries.
Record actual builds, browser checks, URLs, revision, and remaining limitations.
