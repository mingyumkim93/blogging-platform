import Head from "next/head";
import styles from "styles/Home.module.scss";
import MyLayout from "components/layouts/MyLayout";
import Page from "types/Page";
import Link from "next/link";

const Home: Page = () => (
  <div className="page-container">
    <Head>
      <title>Blogging platform By Mingyum Kim</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    Home
    <Link href="/profile">My profile</Link>
  </div>
);

Home.layout = MyLayout;

export default Home;
