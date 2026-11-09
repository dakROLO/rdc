# Redesign validation

Release: 2026.11.08-r1. Local checks November 8, 2026 Pacific.

| Check | Result | Evidence and scope |
|---|---|---|
| Public JS syntax and route/file references | PASS | node --check and explicit allowlist/route checks |
| Portal dependency reproducibility | PASS | pnpm 11.25.0 install --frozen-lockfile --ignore-scripts; existing lock unchanged |
| Portal live-mode build and TypeScript | PASS | NEXT_PUBLIC_RDC_PREVIEW_ONLY=false npm run build |
| Portal isolated-preview build and TypeScript | PASS | NEXT_PUBLIC_RDC_PREVIEW_ONLY=true npm run build |
| Existing SQL security source checks | PASS | validate-sql-foundation.mjs; source only, no database execution |
| Homepage interactions | PASS | Browser selected customer-journey example |
| Website brief | PASS | Empty submission focuses required field; six required contact/answer fields; review, truthful confirmation, copy, edit with retained values |
| Desktop portal decision | PASS | Disabled until option selected; sample selection recorded in tab |
| Mobile layout and menus | PASS | 390px frame with 375 CSS px usable width; homepage/intake/portal scrollWidth equals clientWidth; menus open; no horizontal overflow |
| Physical iPhone and screen reader | NOT RUN | Browser layouts only; owner review remains needed |
| Automated accessibility conformance | NOT RUN | No blanket conformance claim; semantic/label/focus review scoped to delivered primary tasks |
| Production DNS, identity, database changes | N/A | No such changes are part of this test package |
| Live authentication, SQL writes, tenant isolation and blueprint runtime | NOT RUN | Requires isolated authenticated environment and data; prior failures retained |
| Search field performance/indexing | N/A | Test is intentionally noindex; no production outcome claim |
| Deployed headers/routes/version | PENDING | Record after Azure test deployment |

No live messages, bookings, payments, or customer records were submitted during browser checks. Website form uses browser memory and explicit export/email draft. Portal sample uses client-only state. Browser previews do not prove live provider acceptance or database authorization.
