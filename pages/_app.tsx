import { AppProps } from 'next/app';
import { Provider as AuthProvider } from '../context/AuthContext';
import '../styles/globals.styles.scss';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
