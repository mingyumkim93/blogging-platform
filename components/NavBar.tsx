import { FunctionComponent } from "react";
import Link from "next/link";
import styles from "styles/Navbar.module.scss";
import { useFirebase } from "lib/firebase/FirebaseProvider";

const Navbar: FunctionComponent = () => {
  const { user, signout } = useFirebase().auth;

  return (
    <nav className={styles["navbar-container"]}>
      <Link href="/">
        <div className={styles["logo"]}>
          <img src="project.png" alt="Logo" height="30px" />
        </div>
      </Link>

      <div className={styles["button-container"]}>
        {!user ? (
          <>
            <div className={styles["button"]}>
              <Link href="/sign-in">Sign in</Link>
            </div>
            <div className={styles["button"]}>
              <Link href="/sign-up">Sign up</Link>
            </div>
          </>
        ) : (
          <div className={styles["button"]} onClick={() => signout()}>
            <Link href="/">Sign out</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
