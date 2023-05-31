import ResetPasswordForm from './_components/ResetPasswordForm';

import keywords from '~/_data/keywords.json';
import Container from '~/_layouts/Container';

const { NEXT_PUBLIC_BASE_URL } = process.env;

export const metadata = {
  title: 'SquareOne - Reset Password',
  description: 'Sit excepteur proident est commodo laboris consectetur ea tempor officia.',
  keywords: keywords.home,
  url: `${NEXT_PUBLIC_BASE_URL}/account/reset-password`
};

const ResetPassword = () => {
  return (
    <Container className="font-quicksand h-full flex flex-grow flex-col justify-center items-center">
      <div className="w-11/12 border p-6 my-14 rounded sm:w-9/12 md:w-6/12 md:p-8 lg:w-6/12 lg:p-12">
        <h1 className="font-semibold font-libre text-3xl mb-4">Reset your password</h1>
        <p className="block mb-10 ">Plesase enter your new password</p>
        <ResetPasswordForm />
      </div>
    </Container>
  );
};

export default ResetPassword;
