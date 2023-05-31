import ContactForm from './_components/ContactForm';

import keywords from '~/_data/keywords.json';
import Container from '~/_layouts/Container';

const { NEXT_PUBLIC_BASE_URL } = process.env;

export const metadata = {
  title: 'SquareOne - Contact us',
  description: 'Sit excepteur proident est commodo laboris consectetur ea tempor officia.',
  keywords: keywords.contact_us,
  url: `${NEXT_PUBLIC_BASE_URL}/contact`
};

const Contact = () => (
  <Container className="py-20">
    <h1 className="text-align pb-20 text-4xl font-libre uppercase">Contact us</h1>
    <div className="grid lg:grid-cols-2 gap-10">
      <ContactForm />
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3271.87912145818!2d-56.1691871843327!3d-34.909482880381354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959f814c4cec4b67%3A0x10c61042c2b15fc0!2sCo-Work%20Latam-Parque%20Rod%C3%B3!5e0!3m2!1sen!2suy!4v1675892606100!5m2!1sen!2suy"
        width="600"
        height="450"
        loading="lazy"
        className="w-full lg:h-full h-96"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </Container>
);

export default Contact;
