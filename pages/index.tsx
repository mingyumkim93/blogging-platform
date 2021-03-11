import Head from "next/head";
import styles from "styles/Home.module.scss";
import MyLayout from "components/layouts/MyLayout";
import Page from "types/Page";

const Home: Page = () => (
  <div className={styles.container}>
    <Head>
      <title>Blogging platform By Mingyum Kim</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    Home
  </div>
);

Home.layout = MyLayout;

export default Home;
