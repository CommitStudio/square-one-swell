import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

type RequestBody = {
  query: string;
};

const SWELL_STORE_ID = process.env.SWELL_STORE_ID as string;

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
 * Get required data in a single GraphQL request
 ****************************************************************************/
export const getLoggedUser = async (): Promise<SwellGraphQL_AuthObject | null> => {
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
  })) as SwellGraphQL_AuthResponse;

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
  return user?.session.accountId;
};

/*****************************************************************************
 * Get logged user addresses using REST API
 * (GraphQL API does not support addresses?)
 ****************************************************************************/
const getAddresses = async () => {
  const response = (await makeRequest('/api/account/addresses')) as {
    results: SwellGraphQL_AddressObject[];
  };

  return response?.results;
};

/*****************************************************************************
 * Get logged user cards using REST API
 * (GraphQL API does not support cards?)
 ****************************************************************************/
const getCards = async () => {
  const response = (await makeRequest('/api/account/cards')) as {
    results: SwellGraphQL_CardObject[];
  };

  return response?.results;
};
