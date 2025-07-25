import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://vivekraman.dev",
  base: "/",
  output: 'static',
  prefetch: {
    defaultStrategy: "hover",
  },
  integrations: [
    sitemap(),
    mdx(),
    icon({
      include: {
        'skill-icons': [
          'appwrite',
          'astro',
          'aws-light', 'aws-dark',
          'bash-light', 'bash-dark',
          'blender-light', 'blender-dark',
          'c', 'cpp', 'cs',
          'cloudflare-light', 'cloudflare-dark',
          'django',
          'elasticsearch-light', 'elasticsearch-dark',
          'expressjs-light', 'expressjs-dark',
          'fastapi',
          'figma-light', 'figma-dark',
          'flask-light', 'flask-dark',
          'flutter-light', 'flutter-dark',
          'gcp-light', 'gcp-dark',
          'githubactions-light', 'githubactions-dark',
          'gradle-light', 'gradle-dark',
          'grafana-light', 'grafana-dark',
          'java-light', 'java-dark',
          'javascript',
          'jenkins-light', 'jenkins-dark',
          'kafka',
          'kubernetes',
          'maven-light', 'maven-dark',
          'mongodb',
          'mysql-light', 'mysql-dark',
          'nodejs-light', 'nodejs-dark',
          // 'linux-light', 'linux-dark',
          'postgresql-light', 'postgresql-dark',
          'prometheus',
          'python-light', 'python-dark',
          'rabbitmq-light', 'rabbitmq-dark',
          'react-light', 'react-dark',
          'redis-light', 'redis-dark',
          'regex-light', 'regex-dark',
          'spring-light', 'spring-dark',
          'svelte',
          'tensorflow-light', 'tensorflow-dark',
          'unity-light', 'unity-dark',
          'vercel-light', 'vercel-dark',
          'vuejs-light', 'vuejs-dark',
          'xd',
        ]
      }
    })
  ],
  markdown: {
    shikiConfig: {
      theme: {
        light: "material-theme-lighter",
        dark: "material-theme-darker",
      },
      langs: [],
    },
  },
  vite: {
    appType: "mpa",
  },
});
