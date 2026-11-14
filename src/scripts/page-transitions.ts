import type {
  TransitionBeforePreparationEvent,
  TransitionBeforeSwapEvent,
} from "astro:transitions/client";

// Route depth expresses the same hierarchy as the site's breadcrumbs.
function motionFor(event: TransitionBeforePreparationEvent | TransitionBeforeSwapEvent) {
  const depth = (url: URL) => url.pathname.split("/").filter(Boolean).length;
  const difference = depth(event.to) - depth(event.from);
  if (difference !== 0) return difference > 0 ? "forward" : "back";
  if (event.navigationType === "traverse") return event.direction;
  return "fade";
}

document.addEventListener("astro:before-preparation", (event) => {
  document.documentElement.dataset.navMotion = motionFor(event);
});

document.addEventListener("astro:before-swap", (event) => {
  event.newDocument.documentElement.dataset.navMotion = motionFor(event);
  event.newDocument.documentElement.dataset.clientNavigation = "true";
});
