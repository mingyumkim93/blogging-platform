import { FunctionComponent } from "react";
import LayoutProps from "types/LayoutProps";

export default interface Page<T = {}> extends FunctionComponent<T> {
  layout?: FunctionComponent<LayoutProps>;
}
