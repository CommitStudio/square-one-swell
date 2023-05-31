interface SwellAddress {
  active: boolean;
  address1: string;
  address2: string | null;
  city: string;
  country: string;
  date_created?: string;
  fingerprint?: string;
  first_name: string;
  id: string;
  last_name: string;
  name: string;
  parent_id?: string;
  phone: string | null;
  zip: string | null;
}
