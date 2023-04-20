import { NextPage } from 'next';
import Head from 'next/head';
import { FaShoppingCart } from 'react-icons/fa';

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
      <meta property="og:image" content={`${NEXT_PUBLIC_BASE_URL}/img/favicon.svg`} />
      <meta property="og:description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="icon" type="image/svg" href="/img/favicon.svg"></link>
      <link rel="canonical" href={`${NEXT_PUBLIC_BASE_URL}${url}`} />
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link rel="preconnect" href="https://fonts.gstatic.com"></link>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Quicksand:wght@300;400;500;700&display=swap"
        rel="stylesheet"
      ></link>
    </Head>
  );
};

export default Page;
