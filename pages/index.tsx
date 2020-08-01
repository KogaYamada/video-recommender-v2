import Head from 'next/head';
import Link from 'next/link';
import '../styles/pages/home.styles.scss';
import { FC } from 'react';

interface HomeProps {}

const Home: FC<HomeProps> = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>video Recommender</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="st">
        <Link href="/signin-signup">
          <a>ログイン・サインアップ</a>
        </Link>
      </main>
    </>
  );
};

export default Home;
