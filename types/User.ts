import BlogData from "./BlogData";

export default interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  provider: string | null;
  photoURL: string | null;
  blogData?: BlogData;
}
