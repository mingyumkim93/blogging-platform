import Head from "next/head";
import MyLayout from "components/layouts/MyLayout";
import Page from "types/Page";
import { useState } from "react";
import { useAuth } from "auth/AuthProvider";
import axios from "axios";

const SignUp: Page = () => {
  const auth = useAuth();
  //TODO: validate
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  async function submitSignUp() {
    const user = await auth.signup(email, password);
    if (user) {
      await user.updateProfile({ displayName, photoURL });
      axios
        .post("/api/users", {
          uid: user.uid,
          email,
          displayName,
          photoURL
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  }

  function openImageInput() {
    (document.getElementById("image-input") as HTMLInputElement).click();
  }

  function inputImage() {
    const imageInput = document.getElementById(
      "image-input"
    ) as HTMLInputElement;
    const imageFile = imageInput.files ? imageInput.files[0] : null;

    if (imageFile) {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onloadend = () => setPhotoURL(reader.result as string);
    }
  }

  return (
    <div className="page-container">
      <Head>
        <title>sign-up</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <input type="text" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <input type="text" onChange={(e) => setDisplayName(e.target.value)} />
      <input
        type="file"
        id="image-input"
        accept=".jpg, .jpeg, .png"
        onChange={() => inputImage()}
      />
      <img height="200" src={`${photoURL}`} />
      <button onClick={() => openImageInput()}>profile photo</button>
      <button onClick={() => submitSignUp()}>Submit</button>
    </div>
  );
};

SignUp.layout = MyLayout;

export default SignUp;
