import { NextRequest } from 'next/server';

/*****************************************************************************
 * Check if the user is logged in
 ****************************************************************************/
export const getLoggedUser = async (request: NextRequest) => {
  const session = request.cookies.get('swell-session') as string;

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/json');
  requestHeaders.set('Authorization', String(process.env.SWELL_PUBLIC_KEY));
  requestHeaders.set('X-Session', session);

  const response = await fetch('https://square-one.swell.store/graphql', {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify({
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
    })
  });

  const data = (await response.json()) as SwellGraphQL_AuthResponse;

  return data;
};
