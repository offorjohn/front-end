import { Helmet } from 'react-helmet-async';

// eslint-disable-next-line import/no-unresolved
import Private from 'src/sections/Privacy/private';

// ----------------------------------
export default function Privatejon() {
    return (
        <>
            <Helmet>
                <title>AboutPage | OTP NINJA</title>
            </Helmet>
            <Private />
        </>
    );
}
