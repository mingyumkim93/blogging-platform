import { CellPlugin } from "@react-page/editor";
import React from "react";
import ImageRenderer from "components/ImageRenderer";
import PhotoLibrary from "@material-ui/icons/PhotoLibrary";
import Button from "@material-ui/core/Button";
import { connectField, GuaranteedProps } from "uniforms";
import ImageFilePluginData from "types/ImageFilePluginData";

const imageFilePlugin: CellPlugin<ImageFilePluginData> = {
  Renderer: ({ data }) => <ImageRenderer imageUrl={data.imageUrl} />,
  id: "Image-plugin-id",
  title: "Image File",
  description: "Loads an image from a file",
  version: 1,
  controls: {
    type: "autoform",
    schema: {
      properties: {
        imageUrl: {
          type: "string",
          uniforms: {
            component: connectField(({ onChange }: GuaranteedProps<string>) => {
              function openImageInput() {
                (
                  document.getElementById("image-input") as HTMLInputElement
                ).click();
              }

              function showImage(e: React.ChangeEvent<HTMLInputElement>) {
                const imageFile = e.target.files ? e.target.files[0] : null;
                if (imageFile) {
                  const imageUrl = URL.createObjectURL(imageFile);
                  onChange(imageUrl);
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
      required: ["imageUrl"]
    }
  },
  icon: <PhotoLibrary />,
  allowInlineNeighbours: false
};

export default imageFilePlugin;
