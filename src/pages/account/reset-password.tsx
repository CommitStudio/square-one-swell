import ResetPasswordForm from '~/components/account/ResetPasswordForm';
import Head from '~/components/globals/Head';
import keywords from '~/data/keywords.json';

const { NEXT_PUBLIC_BASE_URL } = process.env;

const ResetPassword = () => {
  return (
    <>
      <Head
        title="SquareOne - Reset password"
        description="Sit excepteur proident est commodo laboris consectetur ea tempor officia."
        keywords={keywords.home}
        url={`${NEXT_PUBLIC_BASE_URL}/account/reset-password`}
      />
      <ResetPasswordForm />
    </>
  );
};

export default ResetPassword;
