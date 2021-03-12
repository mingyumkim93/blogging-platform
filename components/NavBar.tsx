import { FunctionComponent } from "react";
import Link from "next/link";
import styles from "styles/NavBar.module.scss";

const NavBar: FunctionComponent = () => {
  return (
    <nav className={styles["navBar-container"]}>
      <Link href="/">
        <div className={styles["logo"]}>
          <img src="project.png" alt="Logo" height="30px" />
        </div>
      </Link>
      <div className={styles["button-container"]}>
        <div className={styles["button"]}>
          <Link href="/sign-in">Sign in</Link>
        </div>
        <div className={styles["button"]}>
          <Link href="/sign-up">Sign up</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
