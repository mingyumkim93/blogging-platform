import { FunctionComponent } from "react";
import ImageFilePluginData from "types/ImageFilePluginData";

const ImageRenderer: FunctionComponent<ImageFilePluginData> = ({
  imageUrl
}) => {
  return (
    <div>
      {!imageUrl && "Image will appear here once you upload your image file"}
      <img width="100%" src={imageUrl} />
    </div>
  );
};

export default ImageRenderer;
