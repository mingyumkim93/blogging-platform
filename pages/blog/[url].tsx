import { useState } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import firestore from "lib/firebase/firebase-admin/firestore";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles
} from "@material-ui/core/styles";
import Page from "types/Page";
import BlogData from "types/BlogData";
import RichEditor from "components/RichEditor";
import { useRouter } from "next/router";
import Loading from "components/Loading";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0
      }
    },
    appBar: {
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth
      }
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none"
      }
    },
    activeList: {
      backgroundColor: "#d5def7"
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    }
  })
);

interface Props {
  blogData: BlogData;
}

const Blog: Page<Props> = ({ blogData }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeList, setActiveList] = useState(0);
  const router = useRouter();

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  if (router.isFallback) {
    return <Loading></Loading>;
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {blogData.contents[activeList] ? (
          blogData.contents.map((content, index) => {
            return (
              <ListItem
                className={index === activeList ? classes.activeList : ""}
                button
                key={index}
                onClick={() => {
                  setActiveList(index);
                  setMobileOpen(false);
                }}>
                <ListItemText primary={content.title} />
              </ListItem>
            );
          })
        ) : (
          <div>No content. Move to edit page.</div>
        )}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {blogData?.name}
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}>
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open>
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {blogData.contents ? (
          <RichEditor
            value={
              blogData.contents[activeList]
                ? blogData.contents[activeList].value
                : null
            }
            readOnly={true}
          />
        ) : (
          <></>
        )}
      </main>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const querySnapshot = await firestore.collection("blogs").get();
  const paths = querySnapshot.docs.map((blog) => {
    return { params: { url: blog.data().url } };
  });

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const url = params!.url;
  const querySnapshot = await firestore
    .collection("blogs")
    .where("url", "==", url)
    .get();
  const blogData = querySnapshot.docs[0].data() as BlogData;
  return { props: { blogData }, revalidate: 5 };
};

export default Blog;
