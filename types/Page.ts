import { FunctionComponent } from "react";
import LayoutProps from "types/LayoutProps";

export default interface Page extends FunctionComponent {
  layout?: FunctionComponent<LayoutProps>;
}
