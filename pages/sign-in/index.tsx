import Head from "next/head";
import AppBarLayout from "components/layouts/AppBarLayout";
import Page from "types/Page";
import { useState } from "react";
import { useFirebase } from "lib/firebase/FirebaseProvider";
import { useRouter } from "next/router";

const SignIn: Page = () => {
  const { user, signin, signinWithGoogle } = useFirebase().auth;
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn() {
    const authError = await signin(email, password);
    if (authError) {
      alert(authError.message);
    }
  }

  if (user) {
    router.push("/");
    return <></>;
  }

  return (
    <div className="page-container">
      <Head>
        <title>sign-in</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <input
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={() => handleSignIn()}>Sign in</button>
      <button onClick={() => signinWithGoogle()}>Sign in with Google</button>
    </div>
  );
};

SignIn.layout = AppBarLayout;

export default SignIn;
