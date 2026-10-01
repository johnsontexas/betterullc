import type { MetadataRoute } from "next";

const BASE_URL = "https://betterullc.com";

const routes = [
  { path: "", priority: 1 },
  { path: "/snapshot", priority: 0.9 },
  { path: "/frameguide", priority: 0.9 },
  { path: "/cogtrack", priority: 0.9 },
  { path: "/Terrarium", priority: 0.9 },
  { path: "/privacy", priority: 0.3 },
  { path: "/terms", priority: 0.3 },
  ...["snapshot", "frameguide", "cogtrack", "Terrarium"].flatMap((app) => [
    { path: `/${app}/privacy`, priority: 0.3 },
    { path: `/${app}/terms`, priority: 0.3 },
  ]),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map(({ path, priority }) => ({
    url: `${BASE_URL}${path}`,
    lastModified,
    changeFrequency: priority >= 0.9 ? "weekly" : "yearly",
    priority,
  }));
}
