import Head from "next/head";
import MyLayout from "components/layouts/MyLayout";
import Page from "types/Page";

const SignUp: Page = () => {
  return (
    <div className="page-container">
      <Head>
        <title>sign-up</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>Sign up page</div>
    </div>
  );
};

SignUp.layout = MyLayout;

export default SignUp;
