interface SwellCategory {
  name: string;
  id: string;
  active: boolean;
  sorting: string | null;
  images: SwellCategoryImage[];
  description: string | null;
  meta_title: string | null;
  meta_description: string | null;
  parent_id: string;
  slug: string;
  top_id: string;
  date_created: string;
  date_updated: string;
  sort: number;
}

interface SwellCategoryImage {
  caption?: string;
  file: SwellCategoryFile;
  id: string;
}

interface SwellCategoryFile {
  width: number;
  height: number;
  id: string;
  length: number;
  date_uploaded: string;
  content_type: string;
  md5: string;
  url: string;
}
