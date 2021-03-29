import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useFirebase } from "lib/firebase/FirebaseProvider";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    },
    smallAvatar: {
      width: theme.spacing(4),
      height: theme.spacing(4)
    }
  })
);

const Navbar: FunctionComponent = () => {
  const classes = useStyles();
  const { user, signout } = useFirebase().auth;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleSignOut() {
    signout();
    handleClose();
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link href="/">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit">
              <img color="white" src="logo.png" height="30px" />
            </IconButton>
          </Link>

          <Typography variant="h6" className={classes.title}>
            Welcome {user?.displayName}
          </Typography>
          {user && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={handleMenu}>
                <Avatar
                  className={classes.smallAvatar}
                  src={user.photoURL || undefined}
                />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={handleClose}>
                <MenuItem onClick={handleClose}>
                  <Link href="/profile">Profile</Link>
                </MenuItem>
                <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
              </Menu>
            </div>
          )}
          {!user && (
            <>
              <Link href="/sign-in">
                <Button color="inherit">Sign in</Button>
              </Link>
              <Link href="/sign-up">
                <Button color="inherit">Sign up</Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
