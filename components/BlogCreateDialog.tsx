import { FunctionComponent, SetStateAction, useState, Dispatch } from "react";
import { useFirebase } from "lib/firebase/FirebaseProvider";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useRouter } from "next/router";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const useStyles = makeStyles((theme: Theme) => createStyles({}));

const Navbar: FunctionComponent<Props> = ({ open, setOpen }) => {
  const classes = useStyles();
  const { createBlog } = useFirebase().db;
  const [blogName, setBlogName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  function handleClose() {
    setOpen(false);
  }

  async function handleCreate() {
    createBlog(blogName)
      .then(() => {
        setOpen(false);
        router.push(`/blogs/${blogName}`);
      })
      .catch((err) => {
        if (err.response.data.message)
          setErrorMessage(err.response.data.message);
      });
  }

  return (
    <Dialog open={open}>
      <DialogTitle>Create blog</DialogTitle>
      <DialogContent>
        <DialogContentText>
          It seems you don't have your own blog yet. Create one!
        </DialogContentText>
        <TextField
          error={errorMessage.length > 0}
          helperText={errorMessage}
          label="Blog name"
          onChange={(e) => setBlogName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          disabled={blogName.length === 0}
          onClick={handleCreate}
          color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Navbar;
