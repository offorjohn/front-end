import { Helmet } from 'react-helmet-async';

// eslint-disable-next-line import/no-unresolved
import AboutPage from 'src/sections/About/about-view';

// ----------------------------------
export default function AboutPageView() {
  return (
    <>
      <Helmet>
        <title>AboutPage | OTP NINJA</title>
      </Helmet>

      <AboutPage />
    </>
  );
}
