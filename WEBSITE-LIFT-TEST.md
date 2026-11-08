# Website Lift test-site rollout — November 2026

## Site and branch
- Repo: dakROLO/rdc
- Test branch: feature/operational-clarity-subsite
- Test workflow: RDC Operational Clarity Test (salmon-flower)
- Main is production and was not modified.
- Service page: /website-lift.html
- Customer intake link: /website-intake.html

## Proposed pricing (review before public production)
- Essential: from $2,495 upfront, $99/month for hosting and care.
- Growth: from $4,495 upfront, $249/month for care and light marketing guidance.
- Premium: from $7,495 upfront, $449/month for growth support.
- Hosting only: from $39/month on qualifying sites.

These are starting offers, not final quotes, contracted SLAs, tax advice, or guaranteed search results.

## Intake covers
Business details, contacts and service area; current website address, platform, developer/maintainer, cost, domain ownership and administrator access; frustrations, local search and lead-generation goals, ideal customers and competitor examples; package fit, launch timeframe, budget, content readiness, requested features, and additional notes.

## Submission behavior and privacy
The test static website has no configured server API, inbox integration, or database. This intake currently gathers answers in-browser only.

- Customer completes the form and reviews a summary.
- Email RDC opens a prefilled email to dakota@royaldigitalclarity.com; the customer MUST press Send.
- Copy / Download are fallbacks; longer drafts may require attaching the downloaded text summary.
- No data is automatically uploaded, collected on a server, or stored in localStorage.
- No passwords or uploads are requested.
- Do not call the feature an automatically submitted lead form until backend delivery is added.

## Next engineering step for production
Connect a secure first-party Azure Function or Microsoft Forms + Power Automate with delivery validation, anti-spam/rate limiting, HTTPS, retention policy, a defined customer privacy notice, and tested inbox / customer acknowledgement. Never embed a webhook secret or Power Automate trigger key in browser JS.

## Owner test checks
1. Verify test.royaldigitalclarity.com home -> Website Lift -> Website Intake.
2. Test package links auto-select the matching package.
3. Complete required fields, test invalid email / unchecked consent.
4. Test desktop/mobile layout and keyboard navigation.
5. Use Email RDC, actually press Send in email app, confirm arrival.
6. Test Copy, Download and Edit answers.
7. Approve package copy and scope before porting to main.

No production merge has been attempted.
