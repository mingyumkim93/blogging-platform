import { FunctionComponent } from "react";
import ImageFilePluginData from "types/ImageFilePluginData";

const ImageRenderer: FunctionComponent<ImageFilePluginData> = ({
  imageURL
}) => {
  return (
    <div>
      {!imageURL && "Image will appear here once you upload your image file"}
      <img width="100%" src={imageURL} />
    </div>
  );
};

export default ImageRenderer;
