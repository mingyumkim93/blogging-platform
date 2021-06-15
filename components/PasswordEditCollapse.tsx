import { FunctionComponent, useState, useEffect } from "react";
import { useFirebase } from "lib/firebase/FirebaseProvider";
import CollapseProps from "types/CollapseProps";
import TextField from "@material-ui/core/TextField";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";

const PasswordEditCollapse: FunctionComponent<CollapseProps> = ({
  opened,
  cancel
}) => {
  const { updatePassword } = useFirebase().auth;
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  useEffect(() => {
    if (!opened) {
      setCurrentPassword("");
      setNewPassword("");
      setNewPasswordConfirm("");
    }
  }, [opened]);

  //TODO: real validation
  function validatePassword() {
    if (
      newPassword !== newPasswordConfirm ||
      newPassword.length < 8 ||
      currentPassword.length < 8
    )
      return false;
    return true;
  }

  async function handleSubmit() {
    if (validatePassword()) {
      await updatePassword(currentPassword, newPassword);
      cancel();
    }
  }

  return (
    <Collapse in={opened}>
      <TextField
        error={currentPassword.length < 8}
        helperText="Put valid current password"
        required
        label="Current password"
        type="password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />
      <TextField
        error={newPassword.length < 8}
        helperText="At least 8 characters"
        required
        label="New password"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <TextField
        error={newPassword !== newPasswordConfirm}
        helperText="Should be same with the other input"
        required
        label="Confirm new password"
        type="password"
        value={newPasswordConfirm}
        onChange={(e) => setNewPasswordConfirm(e.target.value)}
      />
      <div className={"button-group"}>
        <Button disabled={!validatePassword()} onClick={() => handleSubmit()}>
          Edit
        </Button>
        <Button onClick={() => cancel()}>Cancel</Button>
      </div>
    </Collapse>
  );
};

export default PasswordEditCollapse;
