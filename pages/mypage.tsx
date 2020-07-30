import { FC } from 'react';
import Head from 'next/head';

interface MyPageProps {}

const MyPage: FC<MyPageProps> = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>My Page</title>
      </Head>
      <div></div>
    </>
  );
};
