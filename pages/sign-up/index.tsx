import Head from "next/head";
import MyLayout from "components/layouts/MyLayout";
import Page from "types/Page";
import { useState } from "react";
import { useFirebase } from "lib/firebase/FirebaseProvider";
import axios from "axios";
import { useRouter } from "next/router";

const SignUp: Page = () => {
  const { auth } = useFirebase();
  const router = useRouter();

  //TODO: validate
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  async function signUp() {
    const registeredUser = await auth.signup(email, password);
    if (registeredUser) {
      await axios.post("/api/users", {
        uid: registeredUser.uid,
        email,
        displayName
      });
      await registeredUser.updateProfile({ displayName });
      router.push("/");
    }
  }

  if (auth.user) {
    router.push("/");
    return <></>;
  }
  return (
    <div className="page-container">
      <Head>
        <title>sign-up</title>
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
      <input
        type="text"
        onChange={(e) => setDisplayName(e.target.value)}
        placeholder="Name"
      />
      <button onClick={() => signUp()}>Submit</button>
    </div>
  );
};

SignUp.layout = MyLayout;

export default SignUp;
