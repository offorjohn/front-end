import { Helmet } from 'react-helmet-async';

// eslint-disable-next-line import/no-unresolved
import { OrderView } from 'src/sections/order/view';

// ----------------------------------------------------------------------

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title> Order Page </title>
      </Helmet>

      <OrderView />
    </>
  );
}
