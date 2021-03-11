import Head from "next/head";
import MyLayout from "components/layouts/MyLayout";
import Page from "types/Page";

const SignIn: Page = () => {
  return (
    <>
      <Head>
        <title>sign-in</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>Sign in page</div>
    </>
  );
};

SignIn.layout = MyLayout;

export default SignIn;
