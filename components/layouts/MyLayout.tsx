import LayoutProps from "types/LayoutProps";
import { FunctionComponent } from "react";
import NavBar from "components/NavBar";

const MyLayout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default MyLayout;
