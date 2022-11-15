import { NextRequest } from 'next/server';

type RequestBody = {
  query: string;
};

/*****************************************************************************
 * Make GraphQL requests to Swell API
 ****************************************************************************/
const makeRequest = async (request: NextRequest, body: RequestBody) => {
  const session = request.cookies.get('swell-session') as string;

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/json');
  requestHeaders.set('Authorization', String(process.env.SWELL_PUBLIC_KEY));
  requestHeaders.set('X-Session', session);

  return fetch('https://square-one.swell.store/graphql', {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify(body)
  });
};

/*****************************************************************************
 * Check if the user is logged in
 ****************************************************************************/
export const getLoggedUser = async (request: NextRequest): Promise<SwellGraphQL_AuthResponse> => {
  const response = await makeRequest(request, {
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
    }`
  });

  return response.json() as Promise<SwellGraphQL_AuthResponse>;
};
