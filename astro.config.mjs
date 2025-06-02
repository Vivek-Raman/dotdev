import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://vivekraman.dev",
  base: "/",
  integrations: [
    sitemap(),
    mdx(),
    icon({
      include: {
        'skill-icons': [
          'aws-light', 'aws-dark',
          'cs',
          'gcp-light', 'gcp-dark',
          'java-light', 'java-dark',
          'kubernetes',
          'nodejs-light', 'nodejs-dark',
          // 'linux-light', 'linux-dark',
          'postgresql-light', 'postgresql-dark',
          'react-light', 'react-dark',
          'spring-light', 'spring-dark',
          'unity-light', 'unity-dark',
          'vuejs-light', 'vuejs-dark',
        ]
      }
    })
  ],
  markdown: {
    shikiConfig: {
      theme: "material-theme-darker",
      langs: [],
    },
  },
});