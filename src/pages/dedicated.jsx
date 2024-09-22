import { Helmet } from 'react-helmet-async';

// eslint-disable-next-line import/no-unresolved
import {DedicatedView  } from 'src/sections/dedicated/view';

// ----------------------------------------------------------------------

export default function DedicatedPage() {
  return (
    <>
      <Helmet>
        <title> Otp Ninja </title>
      </Helmet>

      <DedicatedView  />
    </>
  );
}
