import { FunctionComponent } from "react";
import Link from "next/link";

const NavBar: FunctionComponent = () => {
  return (
    <div>
      <button>
        <Link href="/">
          <img src="project.png" alt="Logo" height="30px" />
        </Link>
      </button>
      <button>
        <Link href="/sign-in">Sign in</Link>
      </button>
      <button>
        <Link href="/sign-up">Sign up</Link>
      </button>
    </div>
  );
};

export default NavBar;
