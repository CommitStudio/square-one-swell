import { useRouter } from 'next/router';

import { useEffect } from 'react';

import type { AppProps } from 'next/app';

import { useStore } from '~/hooks/useStore';
import Layout from '~/layouts/Layout';

import '~/styles/global.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  const { updateStateProp } = useStore();
  const router = useRouter();
  useEffect(() => {
    if (router.pathname != '/products') {
      updateStateProp('isSearchOpen', false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
