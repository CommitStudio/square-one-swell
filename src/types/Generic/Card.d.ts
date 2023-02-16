interface UserCards {
  id: string;
  last4: string;
  brand: string;
  results: UserCardsResult[];
}

interface UserCardsResult {
  id: string;
  active: boolean;
}
