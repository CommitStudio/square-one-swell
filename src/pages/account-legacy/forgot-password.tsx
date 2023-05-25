import ForgotPasswordForm from 'app/account/forgot-password/ForgotPasswordForm';
import Head from '~/components/globals/Head';
import keywords from '~/data/keywords.json';

const { NEXT_PUBLIC_BASE_URL } = process.env;

const ForgotPassword = () => {
  return (
    <>
      <Head
        title="SquareOne - Forgot password?"
        description="Sit excepteur proident est commodo laboris consectetur ea tempor officia."
        keywords={keywords.home}
        url={`${NEXT_PUBLIC_BASE_URL}/account/forgot-password`}
      />
      <ForgotPasswordForm />
    </>
  );
};

export default ForgotPassword;
