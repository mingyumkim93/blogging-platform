import { FunctionComponent, useState, useEffect } from "react";
import { useFirebase } from "lib/firebase/FirebaseProvider";
import Input from "@material-ui/core/Input";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import CollapseProps from "types/CollapseProps";
import { TextField } from "@material-ui/core";

const EditBlogUrlCollapse: FunctionComponent<CollapseProps> = ({
  opened,
  cancel
}) => {
  const { user, updateMyBlogUrl } = useFirebase().auth;
  const [blogUrl, setBlogUrl] = useState(user?.blogData?.url!);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!opened) {
      setBlogUrl(user?.blogData?.url!);
    }
  }, [opened]);

  async function handleSubmit() {
    await updateMyBlogUrl(blogUrl)
      .then(() => cancel())
      .catch((err) => setErrorMessage(err.response.data.message));
  }

  function handleCancel() {
    setErrorMessage("");
    cancel();
  }

  return (
    <Collapse in={opened}>
      <TextField
        value={blogUrl}
        onChange={(e) => setBlogUrl(e.target.value)}
        error={errorMessage.length > 0}
        helperText={errorMessage}
      />
      <Button
        disabled={
          !blogUrl || blogUrl.length === 0 || user?.blogData?.url === blogUrl
        }
        onClick={() => handleSubmit()}>
        Edit
      </Button>
      <Button onClick={handleCancel}>Cancel</Button>
    </Collapse>
  );
};

export default EditBlogUrlCollapse;
