import Script from 'next/script';

const { GTM_ID } = process.env;
export const GtagScript = () => {
  return (
    <>
      {/* Global site tag (gtag.js) - Google Analytics */}
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
        strategy="afterInteractive"
      />
      <Script async id="google-analytics" strategy="afterInteractive">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GTM_ID}');
      `}
      </Script>
    </>
  );
};
