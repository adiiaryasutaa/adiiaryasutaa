import { allPages, type PageVisibility } from "~/models/pages";

export const usePages = () => useState<PageVisibility>("pages", allPages);
