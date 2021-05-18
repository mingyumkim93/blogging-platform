import Head from "next/head";
import AppBarLayout from "components/layouts/AppBarLayout";
import Page from "types/Page";
import Button from "@material-ui/core/Button";

const EXAMPLE_BLOG_URL = "/blog/mingyum-kim";

const Home: Page = () => (
  <div className="page-container">
    <Head>
      <title>Blogging platform By Mingyum Kim</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <h1>Welcome to blogging platform by Mingyum Kim!</h1>
    <p>You can create your blog page and edit contents.</p>
    <Button
      onClick={() => window.open(EXAMPLE_BLOG_URL)}
      variant="contained"
      color="primary">
      See Example
    </Button>
  </div>
);

Home.layout = AppBarLayout;

export default Home;
