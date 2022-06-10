import { AuthUserProvider } from '../context/AuthUserContext';
import { UserData } from '../context/userData';
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return <AuthUserProvider><UserData><Component {...pageProps} /></UserData></AuthUserProvider>
}

export default MyApp