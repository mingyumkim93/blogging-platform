import Head from "next/head";
import AppBarLayout from "components/layouts/AppBarLayout";
import CustomListItem from "components/CustomListItem";
import Page from "types/Page";
import { useFirebase } from "lib/firebase/FirebaseProvider";
import { useRouter } from "next/router";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import CustomListItemProps from "types/CustomListItemProps";
import DisplayNameEditCollapse from "components/DisplayNameEditCollapse";
import PasswordEditCollapse from "components/PasswordEditCollapse";
import ProfilePhotoEditCollapse from "components/ProfilePhotoEditCollapse";

const Profile: Page = () => {
  const router = useRouter();
  const auth = useFirebase().auth;
  const { user } = auth;

  if (!user) {
    router.push("/");
    return <></>;
  } else {
    const listItems: CustomListItemProps[] = [
      { primary: "Email", secondary: user.email || "" },
      {
        primary: "Display name",
        secondary: user.displayName || "",
        selectable: true,
        collapse: DisplayNameEditCollapse
      },
      { primary: "Password", selectable: true, collapse: PasswordEditCollapse },
      { primary: "Photo", selectable: true, collapse: ProfilePhotoEditCollapse }
    ];

    return (
      <div className="page-container">
        <Head>
          <title>Profile</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <List
          subheader={<ListSubheader component="div">My Profile</ListSubheader>}>
          {listItems.map((listItem, index) => {
            if (listItem.primary === "Password" && user.provider !== "password")
              return null;
            return (
              <CustomListItem
                key={index}
                primary={listItem.primary}
                secondary={listItem.secondary}
                selectable={listItem.selectable}
                collapse={listItem.collapse}
              />
            );
          })}
        </List>
      </div>
    );
  }
};

Profile.layout = AppBarLayout;

export default Profile;
