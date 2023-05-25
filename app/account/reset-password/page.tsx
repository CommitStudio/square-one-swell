import ResetPasswordForm from './ResetPasswordForm';

import keywords from '~/data/keywords.json';

const { NEXT_PUBLIC_BASE_URL } = process.env;

export const metadata = {
  title: 'SquareOne - Orders',
  description: 'Sit excepteur proident est commodo laboris consectetur ea tempor officia.',
  keywords: keywords.home,
  url: `${NEXT_PUBLIC_BASE_URL}/account/reset-password`
};

const ResetPassword = () => {
  return <ResetPasswordForm />;
};

export default ResetPassword;
