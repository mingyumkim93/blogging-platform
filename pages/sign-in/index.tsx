import Head from "next/head";
import MyLayout from "components/layouts/MyLayout";
import Page from "types/Page";
import { useState } from "react";
import { useFirebase } from "lib/firebase/FirebaseProvider";
import { useRouter } from "next/router";

const SignIn: Page = () => {
  const auth = useFirebase().auth;
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function signin() {
    auth
      .signin(email, password)
      .then(() => router.push("/"))
      .catch((err) => console.log(err));
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
      <button onClick={() => signin()}>Sign in</button>
    </div>
  );
};

SignIn.layout = MyLayout;

export default SignIn;
