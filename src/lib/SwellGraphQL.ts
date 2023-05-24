import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

type RequestBody = {
  query: string;
};

/*****************************************************************************
 * Make GraphQL requests to Swell API
 ****************************************************************************/
const makeRequest = async (body: RequestBody) => {
  const nextCookies = cookies();
  const session = nextCookies.get('swell-session')?.value as string;

  if (!session) {
    return null;
  }

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/json');
  requestHeaders.set('Authorization', String(process.env.SWELL_PUBLIC_KEY));
  requestHeaders.set('X-Session', session);

  const response = await fetch('https://square-one.swell.store/graphql', {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify(body)
  });

  return response.json();
};

/*****************************************************************************
 * Get required data in a single GraphQL request
 ****************************************************************************/
export const getLoggedUser = async (): Promise<SwellGraphQL_AuthObject | null> => {
  const { data } = (await makeRequest({
    query: `query checkTokenValidity {
      session {
        accountId
      }
      account {
        name
        firstName
        lastName
        email
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

  return data;
};

/*****************************************************************************
 * Get logged user information
 ****************************************************************************/
export const getUserInfo = async () => {
  const user = await getLoggedUser();

  if (!user?.session.accountId) {
    return redirect('/account/login');
  }

  return {
    user: user.account,
    orders: user.orders.results
  };
};
