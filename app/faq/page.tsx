import FaqSingleQuestion from './_components/FaqSingleQuestion';

import faqJson from '~/_data/faq.json';
import keywords from '~/_data/keywords.json';
import Container from '~/_layouts/Container';

const { faqs } = faqJson;
const { questions } = faqs;
const { NEXT_PUBLIC_BASE_URL } = process.env;

export const metadata = {
  title: 'SquareOne - Faq',
  description: 'Sit excepteur proident est commodo laboris consectetur ea tempor officia.',
  keywords: keywords.faq,
  url: `${NEXT_PUBLIC_BASE_URL}/faq`
};

const Faq = () => {
  return (
    <Container className="py-20 font-libre">
      <h1 className="text-align pb-10 text-4xl">{faqs.title}</h1>
      <div className="grid grid-cols-1 mx-auto">
        {questions.map((item, i) => {
          return <FaqSingleQuestion key={i} question={item.question} answer={item.answer} />;
        })}
      </div>
    </Container>
  );
};

export default Faq;
