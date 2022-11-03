import { useRouter } from 'next/router';
import { useEffect } from 'react';

import RegisterForm from '~/components/account/RegisterForm';
import Head from '~/components/globals/Head';
import keywords from '~/data/keywords.json';
import { useStore } from '~/hooks/useStore';

const { NEXT_PUBLIC_BASE_URL } = process.env;

const CreateAccount = () => {
  const { state } = useStore();
  const router = useRouter();
  console.log(state.user);
  useEffect(() => {
    if (Object.keys(state.user).length !== 0) {
      void router.push('/account/orders');
    }
  }, []);

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
