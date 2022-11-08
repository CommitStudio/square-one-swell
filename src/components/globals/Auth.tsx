import { useUserLogged } from '~/hooks/useSwellAccount';

export default function Auth() {
  useUserLogged();

  return null;
}
