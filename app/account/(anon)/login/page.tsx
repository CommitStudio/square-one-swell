import { redirect } from 'next/navigation';

import LoginForm from './_components/LoginForm';

import keywords from '~/_data/keywords.json';
import { isAuthenticated } from '~/_lib/SwellAPI';

export const metadata = {
  title: 'SquareOne - Login',
  description: 'Sit excepteur proident est commodo laboris consectetur ea tempor officia.',
  keywords: keywords.home,
  url: `${process.env.NEXT_PUBLIC_BASE_URL}/account/login`
};

export default async function Login() {
  const auth = await isAuthenticated();

  if (auth) {
    redirect('/account/orders');
  }

  return <LoginForm />;
}
