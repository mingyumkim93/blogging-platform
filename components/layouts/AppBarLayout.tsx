import { FunctionComponent } from "react";
import { useFirebase } from "lib/firebase/FirebaseProvider";
import LayoutProps from "types/LayoutProps";
import AppBar from "components/AppBar";
import Loading from "components/Loading";

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
