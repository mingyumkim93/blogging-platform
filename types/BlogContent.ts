import { Value } from "@react-page/editor";

export default interface BlogContent {
  [title: string]: Value | null;
}
