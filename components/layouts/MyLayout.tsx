import LayoutProps from "types/LayoutProps";
import { FunctionComponent } from "react";

const MyLayout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <>
      <p>Layout component</p>
      {children}
    </>
  );
};

export default MyLayout;
