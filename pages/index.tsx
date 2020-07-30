import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { FC } from 'react';

interface HomeProps {}

const Home: FC<HomeProps> = (): JSX.Element => {
  return (
    <div>
      <Head>
        <title>vevox values card</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>video recoomender</main>
    </div>
  );
};

export default Home;
