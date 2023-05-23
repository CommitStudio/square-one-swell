import { cookies } from 'next/headers';

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
 * Check if the user is logged in
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
            product {
              images {
                file {
                  url
                }
              }
            }
          }
          currency
          grandTotal
          paid
        }
      }
    }`
  })) as SwellGraphQL_AuthResponse;

  return data;
};
