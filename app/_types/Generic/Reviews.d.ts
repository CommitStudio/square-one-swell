type Reviews = {
  count: number;
  page_count: number;
  page: number;
  results: Review[];
};

interface Review {
  account_id: string;
  comments: string;
  parent_id: string;
  rating: number;
  title: string;
  name: string;
  date_created: string;
  approved: boolean;
  id: string;
}
