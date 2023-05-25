import LoginForm from '~/components/account/LoginForm';
import keywords from '~/data/keywords.json';

const { NEXT_PUBLIC_BASE_URL } = process.env;

export const metadata = {
  title: 'SquareOne - Login',
  description: 'Sit excepteur proident est commodo laboris consectetur ea tempor officia.',
  keywords: keywords.home,
  url: `${NEXT_PUBLIC_BASE_URL}/account/login`
};

export default function Login() {
  return <LoginForm />;
}
