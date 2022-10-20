import LoginForm from '~/components/account/LoginForm';
import Head from '~/components/globals/Head';
import keywords from '~/data/keywords.json';

const { NEXT_PUBLIC_BASE_URL } = process.env;

const Login = () => {
  return (
    <>
      <Head
        title="SquareOne - Login"
        description="Sit excepteur proident est commodo laboris consectetur ea tempor officia."
        keywords={keywords.home}
        url={`${NEXT_PUBLIC_BASE_URL}/account/login`}
      />
      <LoginForm />;
    </>
  );
};

export default Login;
