import { NextPage } from 'next';
import Head from 'next/head';

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
      <meta property="og:title" content={title} />
      <meta property="og:image" content={`${NEXT_PUBLIC_BASE_URL}/img/icons/CartIcon.svg`} />
      <meta property="og:description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="icon" type="image/svg" href="/img/icons/CartIcon.svg"></link>
      <link rel="canonical" href={`${NEXT_PUBLIC_BASE_URL}${url}`} />
    </Head>
  );
};

export default Page;
