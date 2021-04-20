import Head from "next/head";
import AppBarLayout from "components/layouts/AppBarLayout";
import CustomListItem from "components/CustomListItem";
import Page from "types/Page";
import { useFirebase } from "lib/firebase/FirebaseProvider";
import { useRouter } from "next/router";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import CustomListItemProps from "types/CustomListItemProps";
import BlogUrlEditCollapse from "components/BlogUrlEditCollapse";
import BlogContentsEditCollpase from "components/BlogContentsEditCollapse";
import BlogNameEditCollapse from "components/BlogNameEditCollapse";

const EditBlog: Page = () => {
  const router = useRouter();
  const auth = useFirebase().auth;
  const { user } = auth;

  if (!user || !user.blogData) {
    router.push("/");
    return <></>;
  } else {
    const { blogData } = user;
    const listItems: CustomListItemProps[] = [
      {
        primary: "Blog name",
        secondary: blogData.name,
        selectable: true,
        collapse: BlogNameEditCollapse
      },
      {
        primary: "URL",
        secondary: blogData.url,
        selectable: true,
        collapse: BlogUrlEditCollapse
      },
      {
        primary: "Contents",
        selectable: true,
        collapse: BlogContentsEditCollpase
      }
    ];

    return (
      <div className="page-container">
        <Head>
          <title>Edit blog</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <List
          subheader={<ListSubheader component="div">Edit blog</ListSubheader>}>
          {listItems.map((listItem, index) => (
            <CustomListItem
              key={index}
              primary={listItem.primary}
              secondary={listItem.secondary}
              selectable={listItem.selectable}
              collapse={listItem.collapse}
            />
          ))}
        </List>
      </div>
    );
  }
};

EditBlog.layout = AppBarLayout;

export default EditBlog;
