import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import 'server-only';

import Store from './Store';

type RequestBody = {
  query: string;
};

type WishlistBody = {
  id: string;
  content: { wishlist_ids: string[] };
};

const SWELL_STORE_ID = process.env.SWELL_STORE_ID as string;
const SWELL_SECRET_KEY = process.env.SWELL_SECRET_KEY as string;

/*****************************************************************************
 * Extract Swell session cookie
 ****************************************************************************/
const getSessionCookie = () => {
  const nextCookies = cookies();
  const session = nextCookies.get('swell-session')?.value as string;

  return session;
};

/*****************************************************************************
 * Make API request to Swell using logged user session
 ****************************************************************************/
const makeRequest = async (path: string, method = 'GET', body?: RequestBody) => {
  const session = getSessionCookie();

  if (!session) {
    return null;
  }

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/json');
  requestHeaders.set('Authorization', String(process.env.SWELL_PUBLIC_KEY));
  requestHeaders.set('X-Session', session);

  const response = await fetch(`https://${SWELL_STORE_ID}.swell.store${path}`, {
    method: method,
    headers: requestHeaders,
    body: JSON.stringify(body)
  });

  return response.json();
};

/*****************************************************************************
 * Make Admin API request to Swell using secret key
 ****************************************************************************/
const makeAdminRequest = async (path: string, method = 'GET', body?: unknown) => {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/json');
  requestHeaders.set(
    'Authorization',
    `Basic ${Buffer.from(`${SWELL_STORE_ID}:${SWELL_SECRET_KEY}`).toString('base64')}`
  );

  const response = await fetch(`https://api.swell.store${path}`, {
    method: method,
    headers: requestHeaders,
    body: JSON.stringify(body)
  });

  return response.json();
};

/*****************************************************************************
 * Get required data in a single GraphQL request
 ****************************************************************************/
export const getLoggedUser = async (): Promise<SwellAPI_Customer | null> => {
  const response = (await makeRequest('/graphql', 'POST', {
    query: `query checkTokenValidity {
      session {
        accountId
      }
      account {
        name
        firstName
        lastName
        email
        billing {
          accountCardId
        }
      }
      orders {
        results {
          id
          number
          status
          delivered
          dateCreated
          itemQuantity
          items {
            quantity
            price
            discountEach
            variant {
              name
            }
            product {
              name
              images {
                file {
                  url
                }
              }
            }
          }
          currency
          paid
          subTotal
          shipmentPrice
          taxTotal
          grandTotal
          shipping {
            serviceName
            address1
            address2
            city
            zip
            state
            country
            phone
          }
          billing {
            address1
            address2
            city
            zip
            state
            country
            card {
              brand
              last4
              expMonth
              expYear
            }
          }
        }
      }
    }`
  })) as SwellAPI_CustomerResponse;

  return response?.data;
};

/*****************************************************************************
 * Get logged user information
 ****************************************************************************/
export const getUserInfo = async () => {
  const user = await getLoggedUser();

  if (!user?.session.accountId) {
    return redirect('/account/login');
  }

  const addresses = await getAddresses();
  const cards = await getCards();

  return {
    authenticated: true,
    user: user.account,
    orders: user.orders.results || [],
    addresses: addresses || [],
    cards: cards || []
  };
};

/*****************************************************************************
 * Check if user is authenticated
 ****************************************************************************/
export const isAuthenticated = async () => {
  const user = await getLoggedUser();
  return !!user?.session.accountId;
};

/*****************************************************************************
 * Get logged user addresses using REST API
 * (GraphQL API does not support addresses?)
 ****************************************************************************/
const getAddresses = async () => {
  const response = (await makeRequest('/api/account/addresses')) as {
    results: SwellAPI_Address[];
  };

  return response?.results;
};

/*****************************************************************************
 * Get logged user cards using REST API
 * (GraphQL API does not support cards?)
 ****************************************************************************/
const getCards = async () => {
  const response = (await makeRequest('/api/account/cards')) as {
    results: SwellAPI_Card[];
  };

  return response?.results;
};

/*****************************************************************************
 * Get logged user wishlist products ids
 ****************************************************************************/
export const getWishlistIds = async (): Promise<string[]> => {
  const response = (await makeRequest('/api/account')) as WishlistBody;
  return response?.content?.wishlist_ids || [];
};

/*****************************************************************************
 * Get logged user wishlist
 ****************************************************************************/
export const getWishlist = async (): Promise<Product[]> => {
  const productsIds = await getWishlistIds();

  if (productsIds.length === 0) {
    return [];
  }

  const { results } = (await makeRequest(
    `/api/products?where[id][$in]=${productsIds.join(',')}`
  )) as { results: SwellProduct[] };

  const formattedWishlist: Product[] = results.map((product) => {
    return Store.tranformProduct(product);
  });

  return formattedWishlist;
};

/*****************************************************************************
 * Check if product is in logged user wishlist
 ****************************************************************************/
export const isProductInWishlist = async (productId: string): Promise<boolean> => {
  const productsIds = await getWishlistIds();
  return productsIds.includes(productId);
};

/*****************************************************************************
 * Add product to logged user wishlist
 ****************************************************************************/
export const toggleWishlist = async (productId: string): Promise<string[]> => {
  const { id, content } = (await makeRequest('/api/account')) as WishlistBody;

  // Add or remove product depending on if it's already in the wishlist
  const wishlistIds = content?.wishlist_ids.includes(productId)
    ? content.wishlist_ids.filter((id) => id !== productId)
    : [...(content?.wishlist_ids || []), productId];

  // Overwrite wishlist with new list of products
  const wishlist = (await makeAdminRequest(`/accounts/${id}`, 'PUT', {
    $set: { content: { wishlist_ids: wishlistIds } }
  })) as WishlistBody;

  return wishlist.content.wishlist_ids;
};
