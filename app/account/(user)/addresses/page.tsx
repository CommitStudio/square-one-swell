import AddressContainer from './_components/AddressContainer';

import { getUserInfo } from '~/_lib/SwellAPI';

export const metadata = {
  title: 'SquareOne - Addresses',
  description: 'Sit excepteur proident est commodo laboris consectetur ea tempor officia.'
};

export default async function Addresses() {
  const { addresses } = await getUserInfo();
  return <AddressContainer addresses={addresses} />;
}
