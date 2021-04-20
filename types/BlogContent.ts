import { RawDraftContentState } from "draft-js";

export default interface BlogContent {
  [title: string]: RawDraftContentState;
}
