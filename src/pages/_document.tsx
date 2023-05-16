import { Html, Head, Main, NextScript } from 'next/document';

const { NEXT_PUBLIC_BASE_URL } = process.env;

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta property="og:type" content="website" />
        <link rel="icon" type="image/svg" href="/img/favicon.svg"></link>
        <meta property="og:image" content={`${NEXT_PUBLIC_BASE_URL}/img/favicon.svg`} />
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Quicksand:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
