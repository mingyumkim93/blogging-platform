import { FunctionComponent, useState, useEffect } from "react";
import { useFirebase } from "lib/firebase/FirebaseProvider";
import Input from "@material-ui/core/Input";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import CollapseProps from "types/CollapseProps";

const EditBlogNameCollapse: FunctionComponent<CollapseProps> = ({
  opened,
  cancel
}) => {
  const { user, updateMyBlogName } = useFirebase().auth;
  const [blogName, setBlogName] = useState(user?.blogData?.name || "");

  useEffect(() => {
    if (!opened) {
      setBlogName(user?.blogData?.name || "");
    }
  }, [opened]);

  async function handleSubmit() {
    if (user?.blogData?.name !== blogName) await updateMyBlogName(blogName);
    cancel();
  }

  return (
    <Collapse in={opened}>
      <Input value={blogName} onChange={(e) => setBlogName(e.target.value)} />
      <Button
        disabled={!blogName || blogName.length === 0}
        onClick={() => handleSubmit()}>
        Edit
      </Button>
      <Button onClick={() => cancel()}>Cancel</Button>
    </Collapse>
  );
};

export default EditBlogNameCollapse;
