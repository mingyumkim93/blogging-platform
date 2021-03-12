import LayoutProps from "types/LayoutProps";
import { FunctionComponent } from "react";
import Navbar from "components/Navbar";

const MyLayout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default MyLayout;
