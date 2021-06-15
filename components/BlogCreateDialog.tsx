import { FunctionComponent, SetStateAction, useState, Dispatch } from "react";
import { useFirebase } from "lib/firebase/FirebaseProvider";
import { useRouter } from "next/router";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const useStyles = makeStyles((theme: Theme) => createStyles({}));

const BlogCreateDialog: FunctionComponent<Props> = ({ open, setOpen }) => {
  const { createBlog } = useFirebase().db;
  const [blogName, setBlogName] = useState("");
  const [blogUrl, setBlogUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  function handleBlogUrlInput(blogUrl: string) {
    const formatted = blogUrl
      .toLocaleLowerCase()
      .replace(/[^a-z0-9\- ]/g, "")
      .replaceAll(" ", "-")
      .replaceAll("--", "-");
    setBlogUrl(formatted);
    setErrorMessage("");

    if (formatted.startsWith("-") || formatted.endsWith("-")) {
      setErrorMessage("URL should not start or end with hyphen.");
    }
  }

  function handleCancle() {
    setBlogName("");
    setBlogUrl("");
    setOpen(false);
  }

  async function handleCreate() {
    createBlog(blogName, blogUrl)
      .then(() => {
        console.log("????????");
        setOpen(false);
        router.push("/edit-blog");
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
          label="Blog name"
          onChange={(e) => setBlogName(e.target.value)}
        />
        <TextField
          error={errorMessage.length > 0}
          helperText={errorMessage}
          label="Blog URL"
          value={blogUrl}
          onChange={(e) => handleBlogUrlInput(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancle} color="primary">
          Cancel
        </Button>
        <Button
          disabled={blogName.length === 0 || blogUrl.length === 0}
          onClick={handleCreate}
          color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BlogCreateDialog;
