import dayjs from 'dayjs';

import Head from '~/components/globals/Head';
import PlaceholderBanner from '~/components/globals/PlaceholderBanner';

import keywords from '~/data/keywords.json';
import Container from '~/layouts/Container';

const { NEXT_PUBLIC_BASE_URL } = process.env;

const articles = [
  {
    id: 1,
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    slug: 'lorem-ipsum-dolor-sit-amet-consectetur-adipiscing-elit',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    created_at: '2021-11-01T00:00:00.000Z'
  },
  {
    id: 2,
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    slug: 'lorem-ipsum-dolor-sit-amet-consectetur-adipiscing-elit',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    created_at: '2021-09-01T00:00:00.000Z'
  },
  {
    id: 3,
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    slug: 'lorem-ipsum-dolor-sit-amet-consectetur-adipiscing-elit',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    created_at: '2021-03-01T00:00:00.000Z'
  },
  {
    id: 4,
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    slug: 'lorem-ipsum-dolor-sit-amet-consectetur-adipiscing-elit',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    created_at: '2021-01-01T00:00:00.000Z'
  }
];

const Blog = () => {
  return (
    <>
      <Head
        title="SquareOne - Blog"
        description="Sit excepteur proident est commodo laboris consectetur ea tempor officia."
        keywords={keywords.blog}
        url={`${NEXT_PUBLIC_BASE_URL}/blog`}
      />
      <PlaceholderBanner />
      <Container className="py-24">
        <h1 className="font-bold text-align pb-10 text-4xl">Blog</h1>
        <ul>
          {articles.map((article, i) => (
            <li key={i} className="border rounded-md mb-8 py-4 px-10">
              <p className="mb-3 flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                Published: {dayjs(article.created_at).locale('en').format('DD MMMM YYYY')}
              </p>
              <a>
                <h2 className="hover:underline font-header text-headline-3 2xl:text-[2rem] mb-4 cursor-pointer">
                  {article.title}
                </h2>
              </a>
              <p className="mb-4 flex items-center">{article.description}</p>
              <a
                rel="noopener noreferrer"
                className="w-fit flex items-center font-semibold min-w-fit mt-[1.75rem]"
              >
                <span className="mr-2 cursor-pointer hover:underline">View more</span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
};

export default Blog;
