import { FunctionComponent, useState, useEffect } from "react";
import { useFirebase } from "lib/firebase/FirebaseProvider";
import Input from "@material-ui/core/Input";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import CollapseProps from "types/CollapseProps";

const DisplayNameEditCollapse: FunctionComponent<CollapseProps> = ({
  opened,
  cancel
}) => {
  const { user, updateDisplayName } = useFirebase().auth;
  const [displayName, setDisplayName] = useState(user?.displayName);

  useEffect(() => {
    if (!opened) {
      setDisplayName(user?.displayName);
    }
  }, [opened]);

  async function handleSubmit() {
    if (user?.displayName !== displayName)
      await updateDisplayName(displayName as string);
    cancel();
  }

  return (
    <Collapse in={opened}>
      <Input
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />
      <Button
        disabled={!displayName || displayName.length === 0}
        onClick={() => handleSubmit()}>
        Edit
      </Button>
      <Button onClick={() => cancel()}>Cancel</Button>
    </Collapse>
  );
};

export default DisplayNameEditCollapse;
