# Bundle the PostHog SDK

## Outcome

PostHog currently enters the build through `astro-posthog`. Its injected page script imports the default `posthog-js` package. Astro bundles the core SDK, but the default SDK can download executable extensions at runtime.

Replace that integration with an explicit, fully bundled PostHog client. Visitors should send analytics only through the existing same-origin `/gobble/` proxy, without requests to `/gobble/static/` or a PostHog asset domain. Keep the current project token, defaults date, and production-only activation.

Acceptance criteria:

- Production builds initialize exactly one PostHog instance with `api_host: "/gobble"`.
- Loading and navigating the site emits the same PostHog capture behavior as today.
- A normal session makes no runtime JavaScript requests to PostHog asset hosts or `/gobble/static/`.
- The proxy still receives event and configuration requests under `/gobble/`.

## Approach

1. Add `posthog-js` as a direct runtime dependency in `package.json` and refresh `package-lock.json`. Remove `astro-posthog` from both files.

2. Remove the `astro-posthog` import and integration entry from `astro.config.mjs`. This stops Astro from injecting an opaque page script that always imports the default SDK module.

3. Add a small client-only PostHog initializer in `src/components/` and render it once from `src/components/layout/SiteLayout.astro`. Import `posthog-js/dist/module.full.no-external`, then call `posthog.init()` with the existing token, `api_host: "/gobble"`, `defaults: "2026-05-30"`, and `disable_external_dependency_loading: true`.

   The initializer should retain the existing production guard. The build currently substitutes `POSTHOG_KEY` through the Astro integration, so the implementation must use the existing deployment substitution form or migrate it deliberately to an Astro public environment variable. Do not put a real key in source or commit `.env`.

4. Retain the `/gobble/` Nginx ingestion proxy. Leave `/gobble/static/` in place for the first deployment because it is harmless and makes rollback simple. Remove that location only after deployment traffic confirms it receives no PostHog asset requests.

5. Update `src/env.d.ts` and `.env.example` if the implementation chooses `PUBLIC_POSTHOG_KEY`. Otherwise, remove the currently unused `PUBLIC_POSTHOG_*` declarations in the same change.

## Decisions

- Use `module.full.no-external`, not the default `posthog-js` entry point. It bundles PostHog's optional browser extensions, preserving server-enabled replay, surveys, error tracking, and autocapture without remote executable downloads.
- Set `disable_external_dependency_loading: true` even with the no-external module. This prevents fallback calls to the external loader and `config.js`.
- Accept the larger initial JavaScript payload. This site currently ships PostHog's core code in `dist/_astro/page.*.js`; the full no-external build will be larger because it includes optional extensions. A later size-focused change can switch to the experimental slim bundle after selecting the exact PostHog features to keep.
- The PostHog toolbar will not work with a no-external build. Use a temporary default-SDK build only when toolbar access is required, then restore the no-external import before release.

## Boundaries

This change does not try to bypass every privacy tool. It removes the recognizable remote SDK and extension requests. A blocker can still block same-origin event endpoints, and users who opt out should remain opted out.

Do not change PostHog event schema, consent behavior, project settings, or the Nginx referer policy as part of this migration.

## Verification

1. Run `npm run format:check` and `npm run build`.
2. Inspect the built HTML and client chunks. Confirm they contain one PostHog initializer and no injected `astro-posthog` initializer.
3. In a production preview, load the homepage and use an internal link that triggers an Astro view transition. In the Network panel, confirm PostHog requests target `/gobble/`; confirm there are no requests to `/gobble/static/`, `us-assets.i.posthog.com`, or another PostHog asset host.
4. Repeat the preview check with the reported ad blocker enabled. Confirm the first-party capture request is allowed, or record the exact blocked URL and matching filter rule if it is not.
5. Confirm the PostHog live-events view receives the initial pageview and a client-side navigation event. If navigation no longer produces a pageview, add an `astro:after-swap` handler that calls `posthog.capture("$pageview")` with the new URL, then repeat the check.

## Recovery

Revert the dependency and initializer changes, then restore the `astro-posthog` integration in `astro.config.mjs`. Keep the existing `/gobble/static/` proxy until the bundled version has been stable in production.
