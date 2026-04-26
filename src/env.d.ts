/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** PostHog project API key (browser “write” key), optional — omit to disable analytics */
  readonly PUBLIC_POSTHOG_KEY?: string;
  /** Ingestion API, e.g. https://us.i.posthog.com or https://eu.i.posthog.com */
  readonly PUBLIC_POSTHOG_HOST?: string;
}
