import ForgotPasswordForm from './_components/ForgotPasswordForm';

import keywords from '~/_data/keywords.json';
const { NEXT_PUBLIC_BASE_URL } = process.env;

export const metadata = {
  title: 'SquareOne - Forgot password?',
  description: 'Sit excepteur proident est commodo laboris consectetur ea tempor officia.',
  keywords: keywords.home,
  url: `${NEXT_PUBLIC_BASE_URL}/account/forgot-password`
};

export default function ForgotPassword() {
  return <ForgotPasswordForm />;
}
