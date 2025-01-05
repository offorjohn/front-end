import { Helmet } from 'react-helmet-async';

// eslint-disable-next-line import/no-unresolved
import { LoginView } from 'src/sections/login';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> OTPNINJA - Login </title>
      </Helmet>

      <LoginView />
    </>
  );
}
