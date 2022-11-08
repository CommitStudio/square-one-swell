import { useEffect } from 'react';

import { useStore } from '~/hooks/useStore';
import { useUserLogged } from '~/hooks/useSwellAccount';

export default function Auth() {
  const { user } = useUserLogged();
  const { updateStateProp } = useStore();

  useEffect(() => {
    if (user) {
      updateStateProp('user', user);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return null;
}
