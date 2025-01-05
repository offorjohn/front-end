import { Helmet } from 'react-helmet-async';

// eslint-disable-next-line import/no-unresolved
import { UserView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> Otp Ninja </title>
      </Helmet>

      <UserView />
    </>
  );
}
