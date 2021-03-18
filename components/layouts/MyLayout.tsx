import LayoutProps from "types/LayoutProps";
import { FunctionComponent } from "react";
import Navbar from "components/Navbar";
import { useFirebase } from "lib/firebase/FirebaseProvider";

const MyLayout: FunctionComponent<LayoutProps> = ({ children }) => {
  const { loading } = useFirebase().auth;

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default MyLayout;
