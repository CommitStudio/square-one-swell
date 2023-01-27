import { NextPage } from 'next';
import Head from 'next/head';

import { GtagScript } from './GtagScript';

interface Props {
  title: string;
  description: string;
  keywords: string;
  url?: string;
}

const { NEXT_PUBLIC_BASE_URL } = process.env;

const Page: NextPage<Props> = ({ title, description, keywords, url = '' }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:url" content={`${NEXT_PUBLIC_BASE_URL}${url}`} />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={`${NEXT_PUBLIC_BASE_URL}/img/favicon.png`} />
      <meta property="og:description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={`${NEXT_PUBLIC_BASE_URL}${url}`} />
      <GtagScript />
    </Head>
  );
};

export default Page;
