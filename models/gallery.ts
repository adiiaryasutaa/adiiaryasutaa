import galleryData from "@/data/gallery.json";

export const GALLERY_CATEGORIES = ["volunteer", "work", "competition", "other"] as const;

export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

export interface Photo {
  src: string;
  category: GalleryCategory;
}

export const allPhotos = (): Photo[] => galleryData.photos as unknown as Photo[];
