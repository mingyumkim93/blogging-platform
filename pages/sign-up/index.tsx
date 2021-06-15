import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Page from "types/Page";
import { useFirebase } from "lib/firebase/FirebaseProvider";
import AppBarLayout from "components/layouts/AppBarLayout";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    form: {
      width: "100%",
      marginTop: theme.spacing(1)
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    }
  })
);

const SignUp: Page = () => {
  const classes = useStyles();
  const { auth } = useFirebase();
  const router = useRouter();

  //TODO: validate
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  async function signUp() {
    const authError = await auth.signup(email, password, displayName);
    if (authError) {
      alert(authError.message);
    }
  }

  if (auth.user) {
    router.push("/");
    return <></>;
  }

  return (
    <div className="page-container">
      <Head>
        <title>sign-up</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            autoFocus
            fullWidth
            variant="outlined"
            margin="normal"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            type="text"
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Name"
          />
          <Button
            color="primary"
            variant="contained"
            className={classes.submit}
            onClick={() => signUp()}
            fullWidth>
            Sign up
          </Button>
        </form>
      </div>
    </div>
  );
};

SignUp.layout = AppBarLayout;

export default SignUp;
