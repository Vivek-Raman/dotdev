import { defineCollection, z } from "astro:content";

import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ pattern: "*.md(x)?", base: "./content/posts" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    added: z.union([z.string(), z.date()]),
    updated: z.union([z.string(), z.date()]).optional(),
    tags: z.array(z.string()),
    hidden: z.boolean().optional().default(false),
  }),
});

export const collections = { posts };
