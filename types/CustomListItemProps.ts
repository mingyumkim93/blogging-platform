import { FunctionComponent } from "react";
import CollapseProps from "./CollapseProps";

export default interface CustomListItemProps {
  primary: string;
  secondary?: string;
  selectable?: boolean;
  collapse?: FunctionComponent<CollapseProps>;
}
