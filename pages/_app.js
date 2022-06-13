import { AuthUserProvider } from '../context/AuthUserContext';
import { UserData } from '../context/userData';
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return <UserData><AuthUserProvider><Component {...pageProps} /></AuthUserProvider></UserData>
}

export default MyApp