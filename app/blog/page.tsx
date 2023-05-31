import dayjs from 'dayjs';

import keywords from '~/_data/keywords.json';
import Container from '~/_layouts/Container';

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

export const metadata = {
  title: 'SquareOne - Blog',
  description: 'Sit excepteur proident est commodo laboris consectetur ea tempor officia.',
  keywords: keywords.blog,
  url: `${NEXT_PUBLIC_BASE_URL}/blog`
};

const Blog = () => (
  <Container className="py-20">
    <h1 className="text-align pb-20 text-4xl font-libre uppercase">Blog</h1>
    <ul>
      {articles.map((article, i) => (
        <li key={i} className="border border-gray-medium mb-8 py-4 px-10">
          <p className="mb-3 flex items-center font-quicksand">
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
            <h2 className="hover:underline font-libre text-headline-3 2xl:text-[2rem] mb-4 cursor-pointer">
              {article.title}
            </h2>
          </a>
          <p className="mb-4 flex items-center font-quicksand">{article.description}</p>
          <a
            rel="noopener noreferrer"
            className="w-fit flex items-center font-semibold min-w-fit mt-[1.75rem]"
          >
            <span className="mr-2 cursor-pointer underline font-quicksand">View more</span>
          </a>
        </li>
      ))}
    </ul>
  </Container>
);

export default Blog;
