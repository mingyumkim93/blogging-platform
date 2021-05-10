import { Value } from "@react-page/editor";

export default interface BlogContent {
  title: string;
  value: Value | null;
  id: string;
  isSaved?: boolean;
  updatedAt?: Date;
}
