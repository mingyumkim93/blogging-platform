export default interface BlogData {
  created: string;
  name: string;
  url: string;
  contents?: [
    {
      [title: string]: string;
    }
  ];
}
