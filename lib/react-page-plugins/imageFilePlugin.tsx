import { CellPlugin } from "@react-page/editor";
import React, { useState } from "react";
import ImageRenderer from "components/ImageRenderer";
import PhotoLibrary from "@material-ui/icons/PhotoLibrary";
import Button from "@material-ui/core/Button";
import { connectField, GuaranteedProps } from "uniforms";
import ImageFilePluginData from "types/ImageFilePluginData";
import { useFirebase } from "lib/firebase/FirebaseProvider";

const imageFilePlugin: CellPlugin<ImageFilePluginData> = {
  Renderer: ({ data }) => <ImageRenderer imageURL={data.imageURL} />,
  id: "Image-plugin-id",
  title: "Image File",
  description: "Loads an image from a file",
  version: 1,
  controls: {
    columnCount: 1,
    type: "autoform",
    schema: {
      properties: {
        imageURL: {
          type: "string",
          uniforms: {
            component: connectField(({ onChange }: GuaranteedProps<string>) => {
              const { uploadContentMedia } = useFirebase().auth;
              const [isLoading, setIsLoading] = useState(false);
              function openImageInput() {
                (
                  document.getElementById("image-input") as HTMLInputElement
                ).click();
              }

              async function showImage(e: React.ChangeEvent<HTMLInputElement>) {
                setIsLoading(true);
                const contentId = localStorage.getItem("expanded-id");
                const imageFile = e.target.files ? e.target.files[0] : null;
                if (imageFile && contentId) {
                  const imageURL = await uploadContentMedia(
                    imageFile,
                    contentId
                  );
                  setIsLoading(false);
                  onChange(imageURL);
                }
              }
              return (
                <>
                  <input
                    hidden
                    id="image-input"
                    type="file"
                    accept="image/*"
                    onChange={(e) => showImage(e)}
                  />
                  <Button
                    disabled={isLoading}
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => openImageInput()}>
                    Search image file
                  </Button>
                </>
              );
            })
          }
        }
      },
      required: ["imageURL"]
    }
  },
  icon: <PhotoLibrary />,
  allowInlineNeighbours: false
};

export default imageFilePlugin;
