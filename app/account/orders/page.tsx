import { redirect } from 'next/navigation';

import AccountLayout from '~/components/account/AccountLayout';

import { getLoggedUser } from '~/lib/SwellGraphQL';

async function getData() {
  const data = await getLoggedUser();

  if (!data?.session.accountId) {
    return redirect('/account/login');
  }

  return { user: data };
}

export default async function Test() {
  const { user } = await getData();
  return <AccountLayout account={user.account}>Hello World!</AccountLayout>;
}
