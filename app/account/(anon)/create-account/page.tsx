import { redirect } from 'next/navigation';

import RegisterForm from './_components/RegisterForm';

import keywords from '~/_data/keywords.json';
import { isAuthenticated } from '~/_lib/SwellAPI';

const { NEXT_PUBLIC_BASE_URL } = process.env;

export const metadata = {
  title: 'SquareOne - Create account',
  description: 'Sit excepteur proident est commodo laboris consectetur ea tempor officia.',
  keywords: keywords.home,
  url: `${NEXT_PUBLIC_BASE_URL}/account/create-account`
};

const CreateAccount = async () => {
  const auth = await isAuthenticated();

  if (auth) {
    redirect('/account/orders');
  }

  return <RegisterForm />;
};

export default CreateAccount;
