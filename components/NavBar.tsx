import { FunctionComponent } from "react";
import Link from "next/link";
import styles from "styles/Navbar.module.scss";
import { useAuth } from "auth/AuthProvider";

const Navbar: FunctionComponent = () => {
  const auth = useAuth();

  return (
    <nav className={styles["navbar-container"]}>
      <Link href="/">
        <div className={styles["logo"]}>
          <img src="project.png" alt="Logo" height="30px" />
        </div>
      </Link>

      <div className={styles["button-container"]}>
        {!auth!.user ? (
          <div className={styles["button"]}>
            <Link href="/sign-in">Sign in</Link>
          </div>
        ) : (
          <div>Sign out</div>
        )}

        <div className={styles["button"]}>
          <Link href="/sign-up">Sign up</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
