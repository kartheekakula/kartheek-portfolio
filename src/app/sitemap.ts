import type { MetadataRoute } from "next";
import { content } from "@/data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://kartheek.dev";

  const projectUrls = content.projects.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: new Date("2026-11-13"),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date("2026-11-13"),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    ...projectUrls,
  ];
}

