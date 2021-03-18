import Head from "next/head";
import MyLayout from "components/layouts/MyLayout";
import Page from "types/Page";
import { useState } from "react";
import { useFirebase } from "lib/firebase/FirebaseProvider";
import axios from "axios";
import styles from "styles/SignUp.module.scss";
import { useRouter } from "next/router";

const SignUp: Page = () => {
  const { auth, storage } = useFirebase();
  const { user, signup } = auth;
  const router = useRouter();

  //TODO: validate
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreviewData, setPhotoPreviewData] = useState("");

  async function submitSignUp() {
    const registeredUser = await signup(email, password);
    if (registeredUser) {
      if (photo) {
        const snapshot = await storage.addPhoto(registeredUser.uid, photo);
        const downloadURL = (await snapshot.ref.getDownloadURL()) as string;
        axios.post("/api/users", {
          uid: registeredUser.uid,
          email,
          displayName,
          photoURL: downloadURL
        });
        await registeredUser.updateProfile({
          displayName,
          photoURL: downloadURL
        });
      }
      router.push("/");
    }
  }

  function openImageInput() {
    (document.getElementById("image-input") as HTMLInputElement).click();
  }

  function inputImage() {
    const imageInput = document.getElementById(
      "image-input"
    ) as HTMLInputElement;
    setPhoto(imageInput.files ? imageInput.files[0] : null);

    if (imageInput.files && imageInput.files[0]) {
      setPhoto(imageInput.files[0]);
      const reader = new FileReader();
      reader.readAsDataURL(imageInput.files[0]);
      reader.onloadend = () => setPhotoPreviewData(reader.result as string);
    }
  }

  if (user) {
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
      <input
        className={styles["image-input"]}
        type="file"
        id="image-input"
        accept=".jpg, .jpeg, .png"
        onChange={() => inputImage()}
      />
      <img height="200" src={`${photoPreviewData}`} />
      <button onClick={() => openImageInput()}>profile photo</button>
      <button onClick={() => submitSignUp()}>Submit</button>
    </div>
  );
};

SignUp.layout = MyLayout;

export default SignUp;
