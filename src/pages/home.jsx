import { Helmet } from 'react-helmet-async';

// eslint-disable-next-line import/no-unresolved
import { HomeView } from 'src/sections/hompage';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> HomePage  | OTP NINJA </title>
      </Helmet>

      <HomeView />
    </>
  );
}
