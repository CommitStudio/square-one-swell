import RegisterForm from '~/components/account/RegisterForm';
import Head from '~/components/globals/Head';
import keywords from '~/data/keywords.json';

const { NEXT_PUBLIC_BASE_URL } = process.env;

const CreateAccount = () => {
  return (
    <>
      <Head
        title="SquareOne - Create account"
        description="Sit excepteur proident est commodo laboris consectetur ea tempor officia."
        keywords={keywords.home}
        url={`${NEXT_PUBLIC_BASE_URL}/account/create-account`}
      />
      <RegisterForm />
    </>
  );
};

export default CreateAccount;
