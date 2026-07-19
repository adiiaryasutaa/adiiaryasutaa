import pagesData from "@/data/pages.json";

export interface PageVisibility {
  about: boolean;
  project: boolean;
  gallery: boolean;
  blog: boolean;
  friend: boolean;
}

export const allPages = (): PageVisibility => pagesData as PageVisibility;
