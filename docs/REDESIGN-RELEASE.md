# RDC delivery guide redesign test release

Date: November 8, 2026. Release: 2026.11.08-r1.

## Scope and source

Apply the RDC Customer Website Delivery Guide v1.0 to the public website and customer workspace. The eight-question Website Demo Questionnaire is the website intake. The existing operational assessment remains a separate route.

Public repository: dakROLO/rdc. Website baseline and original test head: `50fd33ac10883074e6a487d3ca3d3ac8c3e85191`.
Portal repository: dakROLO/rdc-customer-portal. Portal baseline: `00e46223a853b623cc60f1785dc4c8c0b71f67f2`.
Both retain `rollback/pre-delivery-redesign-2026-11-08` at their starting revisions. Candidate work uses `feature/delivery-guide-redesign`.

The public test target is the existing `feature/operational-clarity-subsite` deployment (salmon-flower). Production website `main` (orange-grass) is not promoted. Portal production `main` (brave-sand) is not promoted.

## Delivered behavior

- Redesigned home, services, website packages, six-phase delivery process, about, privacy, and real 404 pages.
- Eight-question website brief with validation, review/edit, copy/download, and email draft. No upload, local storage, or automatic submission. Long answers require download/attachment; confirmations never claim server receipt.
- Actual static export of the portal candidate at `/portal/`, including customer/team preview, six phases, sample actions/decisions, website brief, and downloadable review.
- Preview has no identity initialization or backend/API deployment. Sample state is held in memory and resets on reload. It does not access or modify live records.
- Existing authenticated portal source remains intact, with redesigned home/sign-in, a six-phase reference, removal of a hard-coded meeting, and a bounded error state for failed authorization.

## Reproduce

In the private portal candidate: install from the existing lockfile, then run `NEXT_PUBLIC_RDC_PREVIEW_ONLY=true npm run build`. Copy `out/` to public candidate `portal-preview/`. The portal base path is `/portal` for the preview build only. No API output is copied.

Run `python3 scripts/redesign-pages.py` only when deliberately regenerating the authored public pages. Run `node scripts/build-static.mjs --test` to package an explicit public-file allowlist into `dist/`. Verify local and deployed URLs, the version, noindex headers, and the API denial. The build rejects unspecified/production packaging.

The test workflow packages `dist/` and uploads it with the existing test token. It excludes source documentation, repository metadata, environment files, database scripts, and private exports. Next's necessary inline scripts are hashed into the test CSP. No new third-party tracking or font script is added.

## Complete rollback

No database migration, identity/provider setting, production DNS, or live content/data mutation is part of this package. This keeps rollback at the source/deployment layer.

1. Restore the original website tree with a NEW commit on the test deployment branch, retaining the redesign commits in history:

   ```sh
   git switch feature/operational-clarity-subsite
   git restore --source=rollback/pre-delivery-redesign-2026-11-08 --staged --worktree .
   git commit -m "Restore pre-delivery-redesign test website"
   git push origin feature/operational-clarity-subsite
   ```

   This restores the old test workflow too, which deploys the original root contents. Do not reset/force-push or target main.
2. Confirm the test workflow succeeds; verify home, original website intake, and old portal destination. `/portal/` sample disappears with the old test tree. Check caches if a stale view persists.
3. The real portal is already at its starting production revision because its candidate branch was never merged. Retain/close its draft PR as desired; preserve source for later review. If later promoted, restore its original tree through a new rollback commit and redeploy, after reassessing any intervening changes.
4. Record rollback deployment ID, revision, time, smoke checks, and any new work since these baselines. Do not overwrite unrelated later changes blindly.

To return to the candidate, revert the rollback commit through the same test release path after review.

## Acceptance boundaries

Review at `https://test.royaldigitalclarity.com/` and `/portal/`. Verify phone navigation, website brief invalid/valid/edit/export behavior, sample workspace navigation/actions/decision/export, route errors, indexing controls, and no external API/identity calls from the sample workspace.

This release verifies the sample experience and source builds. Live sign-in, SQL persistence, cross-customer authorization, private file delivery, and existing blueprint write operations require separate authenticated checks on an isolated integration environment. The prior `blueprint_admin_unavailable` report remains unresolved until actual database/procedure/runtime evidence confirms otherwise. No SOC 2 examination or compliance certification is claimed.

Portal preview source revision: `79471ceb74ddae77c3883769c6e25d818043ff53`. Review branch: https://github.com/dakROLO/rdc-customer-portal/pull/5.
