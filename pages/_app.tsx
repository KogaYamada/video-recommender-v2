import { AppProps } from 'next/app';
import '../styles/globals.module.scss';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}

export default MyApp;
