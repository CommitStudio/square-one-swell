import Link from 'next/link';

import keywords from '~/_data/keywords.json';
import Container from '~/_layouts/Container';

const { NEXT_PUBLIC_BASE_URL } = process.env;

export const metadata = {
  title: 'SquareOne - Privacy Policy',
  description: 'Sit excepteur proident est commodo laboris consectetur ea tempor officia.',
  keywords: keywords.privacy_policy,
  url: `${NEXT_PUBLIC_BASE_URL}/privacy-policy`
};

const PrivacyPolicy = () => (
  <Container className="py-20">
    {/* TODO: TEXT TO BE REVISED */}
    <h1 className="text-align pb-20 text-4xl font-libre uppercase">Privacy Policy</h1>
    <p className="font-quicksand pb-4">
      This Privacy Policy describes how your personal information is collected, used, and shared
      when you visit or make a purchase from (the “Site”).{' '}
    </p>
    <h3 className="font-bold font-quicksand pb-1">PERSONAL INFORMATION WE COLLECT</h3>
    <p className="font-quicksand pb-4">
      When you visit the Site, we automatically collect certain information about your device,
      including information about your web browser, IP address, time zone, and some of the cookies
      that are installed on your device. Additionally, as you browse the Site, we collect
      information about the individual web pages or products that you view, what websites or search
      terms referred you to the Site, and information about how you interact with the Site. We refer
      to this automatically-collected information as “Device Information.” We collect Device
      Information using the following technologies: - “Log files” track actions occurring on the
      Site, and collect data including your IP address, browser type, Internet service provider,
      referring/exit pages, and date/time stamps. - “Web beacons,” “tags,” and “pixels” are
      electronic files used to record information about how you browse the Site. Additionally when
      you make a purchase or attempt to make a purchase through the Site, we collect certain
      information from you, including your name, billing address, shipping address, payment
      information including credit card numbers, email address, and phone number. We refer to this
      information as “Order Information.” When we talk about “Personal Information” in this Privacy
      Policy, we are talking both about Device Information and Order Information.
    </p>
    <h3 className="font-bold font-quicksand pb-1">HOW DO WE USE YOUR PERSONAL INFORMATION?</h3>{' '}
    <div>
      <p className="font-quicksand pb-4">
        We use the Order Information that we collect generally to fulfill any orders placed through
        the Site (including processing your payment information, arranging for shipping, and
        providing you with invoices and/or order confirmations). Additionally, we use this Order
        Information to: Communicate with you; Screen our orders for potential risk or fraud; and
        When in line with the preferences you have shared with us, provide you with information or
        advertising relating to our products or services. We use the Device Information that we
        collect to help us screen for potential risk and fraud (in particular, your IP address), and
        more generally to improve and optimize our Site (for example, by generating analytics about
        how our customers browse and interact with the Site, and to assess the success of our
        marketing and advertising campaigns).
      </p>
      <h3 className="font-bold font-quicksand pb-1">SHARING YOUR PERSONAL INFORMATION </h3>
      <p className="font-quicksand pb-4">
        We share your Personal Information with third parties to help us use your Personal
        Information, as described above. We also use Google Analytics to help us understand how our
        customers use the Site--you can read more about how Google uses your Personal Information
        here: https://www.google.com/intl/en/policies/privacy/. You can also opt-out of Google
        Analytics here: https://tools.google.com/dlpage/gaoptout. Finally, we may also share your
        Personal Information to comply with applicable laws and regulations, to respond to a
        subpoena, search warrant or other lawful request for information we receive, or to otherwise
        protect our rights. BEHAVIOURAL ADVERTISING As described above, we use your Personal
        Information to provide you with targeted advertisements or marketing communications we
        believe may be of interest to you.
      </p>
    </div>
    <h3 className="font-bold font-quicksand pb-1">DO NOT TRACK</h3>
    <p className="font-quicksand pb-4">
      Please note that we do not alter our Site’s data collection and use practices when we see a Do
      Not Track signal from your browser.
    </p>
    <h3 className="font-bold font-quicksand pb-1">YOUR RIGHTS</h3>
    <p className="font-quicksand pb-4">
      If you are a European resident, you have the right to access personal information we hold
      about you and to ask that your personal information be corrected, updated, or deleted. If you
      would like to exercise this right, please contact us through the contact information below.
      Additionally, if you are a European resident we note that we are processing your information
      in order to fulfill contracts we might have with you (for example if you make an order through
      the Site), or otherwise to pursue our legitimate business interests listed above.
      Additionally, please note that your information will be transferred outside of Europe,
      including to Canada and the United States.
    </p>
    <h3 className="font-bold font-quicksand pb-1">DATA RETENTION</h3>
    <p className="font-quicksand pb-4">
      When you place an order through the Site, we will maintain your Order Information for our
      records unless and until you ask us to delete this information.
    </p>
    <h3 className="font-bold font-quicksand pb-1">CHANGES</h3>
    <p className="font-quicksand pb-4">
      We may update this privacy policy from time to time in order to reflect, for example, changes
      to our practices or for other operational, legal or regulatory reasons.
    </p>
    <h3 className="font-bold font-quicksand pb-1">CONTACT US</h3>
    <p className="font-quicksand">
      For more information about our privacy practices, if you have questions, or if you would like
      to make a complaint, please contact us by e-mail at{' '}
      <Link href="mailto:info@squareone.com" className="italic">
        info@squareone.com
      </Link>{' '}
      or by mail using the details provided below: Blvr. Artigas 1182, Montevideo, Montevideo,
      11200, Uruguay
    </p>
  </Container>
);

export default PrivacyPolicy;
