import LayoutProps from "types/LayoutProps";
import { FunctionComponent } from "react";
import AppBar from "components/AppBar";
import Loading from "components/Loading";
import { useFirebase } from "lib/firebase/FirebaseProvider";

const AppBarLayout: FunctionComponent<LayoutProps> = ({ children }) => {
  const { loading } = useFirebase().auth;

  if (loading) return <Loading></Loading>;

  return (
    <>
      <AppBar />
      {children}
    </>
  );
};

export default AppBarLayout;
