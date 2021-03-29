import Head from "next/head";
import AppBarLayout from "components/layouts/AppBarLayout";
import Page from "types/Page";

const Home: Page = () => (
  <div className="page-container">
    <Head>
      <title>Blogging platform By Mingyum Kim</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    Home
  </div>
);

Home.layout = AppBarLayout;

export default Home;
