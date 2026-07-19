import { allPhotos } from "~/models/gallery";

export const useGallery = () => useState("gallery", allPhotos);
