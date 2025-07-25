import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_DESCRIPTION, SITE_TITLE } from "../config";

let allPosts = await getCollection("posts");
let posts = allPosts.filter((post) => !post.data.hidden);

posts = posts.sort(
  (a, b) =>
    new Date(b.data.updated || b.data.added).valueOf() -
    new Date(a.data.updated || a.data.added).valueOf()
);

export const GET = () =>
  rss({
    title: SITE_TITLE || "",
    description: SITE_DESCRIPTION || "",
    site: import.meta.env.SITE,
    items: posts.map((post) => {
      return {
        link: `/blog/${post.data.slug}`,
        title: post.data.title,
        pubDate: post.data.added,
        description: post.data.description,
        customData: `<updated>${post.data.updated ? post.data.updated : ""}</updated>`,
      };
    }),
  });
