import { Helmet } from 'react-helmet-async';
// eslint-disable-next-line perfectionist/sort-imports, import/no-unresolved
import Terms from 'src/sections/Terms/terms';
// ----------------------------------
export default function Private() {
    return (
        <>
            <Helmet>
                <title> OTPNINJA Terms & Conditions</title>
            </Helmet>
            <Terms />
        </>
    );
}
