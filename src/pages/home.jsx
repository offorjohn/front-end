import { Helmet } from 'react-helmet-async';

// eslint-disable-next-line import/no-unresolved
import { HomeView } from 'src/sections/hompage';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> OTPNINJA - HomePage </title>
      </Helmet>

      <HomeView />
    </>
  );
}
