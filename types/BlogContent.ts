import { Value } from "@react-page/editor";

export default interface BlogContent {
  title: string;
  value: Value | null;
  isSaved?: boolean;
  updatedAt?: Date;
}
