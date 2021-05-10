import BlogContent from "./BlogContent";

export default interface BlogData {
  created: string;
  name: string;
  url: string;
  contents: BlogContent[];
}
