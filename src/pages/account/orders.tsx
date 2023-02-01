import Link from 'next/link';

import { BiShoppingBag } from 'react-icons/bi';
import { AccountInformation } from 'swell-js';

import AccountLayout from '~/components/account/AccountLayout';
//import OrderCard from '~/components/account/OrdersCard';
import { useStore } from '~/hooks/useStore';

//const lastOrder = swell.cart.getOrder();
//console.log(lastOrder);

const Orders = () => {
  const { state } = useStore();
  const { user } = state as { user: AccountInformation };
  //console.log(user);

  return (
    <AccountLayout>
      <h4 className="text-3xl font-medium mb-5">Orders & Returns</h4>
      {user?.id}
      {/* {console.log(orders)} */}
      <p className="text-gray-400">You haven&lsquo;t ordered anything yet.</p>
      <Link href="/products">
        <a className="inline-flex items-center gap-1 bg-secondary text-primary p-3 rounded mt-10 transition-all duration-300 hover:bg-primary hover:text-secondary">
          <BiShoppingBag />
          START SHOPPING
        </a>
      </Link>
    </AccountLayout>
  );
};

// export const getServerSideProps: GetServerSideProps = async () => {
//   const ordersByUser = await Store.getOrdersByUser('63695e4eb1a986001269dd7b');

//   return { props: { ordersByUser } };
// };

export default Orders;
