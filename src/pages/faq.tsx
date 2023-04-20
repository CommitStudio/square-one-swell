import FaqSingleQuestion from '~/components/faq/FaqSingleQuestion';

import Head from '~/components/globals/Head';

import faqJson from '~/data/faq.json';
import keywords from '~/data/keywords.json';
import Container from '~/layouts/Container';
const { faqs } = faqJson;
const { questions } = faqs;
const { NEXT_PUBLIC_BASE_URL } = process.env;

const Faq = () => {
  return (
    <>
      <Head
        title="SquareOne - Faq"
        description="Sit excepteur proident est commodo laboris consectetur ea tempor officia."
        keywords={keywords.faq}
        url={`${NEXT_PUBLIC_BASE_URL}/faq`}
      />
      <Container className="py-20 font-libre">
        <h1 className="text-align pb-10 text-4xl">{faqs.title}</h1>
        <div className="grid grid-cols-1 mx-auto">
          {questions.map((item, i) => {
            return <FaqSingleQuestion key={i} question={item.question} answer={item.answer} />;
          })}
        </div>
      </Container>
    </>
  );
};

export default Faq;
