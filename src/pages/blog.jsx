import { Helmet } from 'react-helmet-async';

// eslint-disable-next-line import/no-unresolved
import { BlogView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title> Blog | OTP Ninja </title>
      </Helmet>

      <BlogView />
    </>
  );
}
