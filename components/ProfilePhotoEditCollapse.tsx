import { FunctionComponent, useState, useEffect } from "react";
import { useFirebase } from "lib/firebase/FirebaseProvider";
import CollapseProps from "types/CollapseProps";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    largeAvatar: {
      width: theme.spacing(30),
      height: theme.spacing(30)
    }
  })
);

const ProfilePhotoEditCollapse: FunctionComponent<CollapseProps> = ({
  opened,
  cancel
}) => {
  const { user, updateProfilePhoto } = useFirebase().auth;
  const [newImage, setNewImage] = useState<File | null | undefined>(undefined);
  const [imagePreviewData, setImagePreviewData] = useState(
    user?.photoURL || ""
  );
  const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (!opened) {
      setHasBeenSubmitted(false);
      setNewImage(undefined);
      setImagePreviewData(user?.photoURL || "");
    }
  }, [opened]);

  function openImageInput() {
    (document.getElementById("image-input") as HTMLInputElement).click();
  }

  function inputImage() {
    const imageInput = document.getElementById(
      "image-input"
    ) as HTMLInputElement;
    if (imageInput.files && imageInput.files[0]) {
      setNewImage(imageInput.files[0]);
      const reader = new FileReader();
      reader.readAsDataURL(imageInput.files[0]);
      reader.onloadend = () => setImagePreviewData(reader.result as string);
    }
  }

  function emptyProfilePhoto() {
    setImagePreviewData("");
    setNewImage(null);
  }

  async function handleSubmit() {
    setHasBeenSubmitted(true);
    if (!(newImage === undefined)) await updateProfilePhoto(newImage);
    cancel();
  }

  return (
    <Collapse in={opened}>
      <input
        hidden
        id="image-input"
        type="file"
        accept="image/*"
        onChange={() => inputImage()}
      />
      <Avatar src={imagePreviewData} className={classes.largeAvatar} />
      <Button onClick={() => emptyProfilePhoto()}>Empty</Button>
      <Button onClick={() => openImageInput()}>Find</Button>
      <Button disabled={hasBeenSubmitted} onClick={() => handleSubmit()}>
        Edit
      </Button>
      <Button onClick={() => cancel()}>Cancel</Button>
    </Collapse>
  );
};

export default ProfilePhotoEditCollapse;
