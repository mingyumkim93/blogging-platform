import React, { FunctionComponent } from "react";
import type { Value, CellSpacing, CellPlugin } from "@react-page/editor";
import Editor from "@react-page/editor";
import slate from "@react-page/plugins-slate";
import image from "@react-page/plugins-image";
import video from "@react-page/plugins-video";
import spacer from "@react-page/plugins-spacer";
import background from "@react-page/plugins-background";

interface EditorProps {
  value: Value | null;
  readOnly?: boolean;
  onChange?: (v: Value) => void;
}

const RichEditor: FunctionComponent<EditorProps> = ({
  value,
  readOnly,
  onChange
}) => {
  const cellPlugins = [
    slate(),
    image,
    video,
    spacer,
    background({})
  ] as CellPlugin[];
  const cellSpacing: CellSpacing = { x: 10, y: 10 };

  return (
    <Editor
      value={value}
      readOnly={readOnly}
      onChange={onChange}
      cellPlugins={cellPlugins}
      cellSpacing={cellSpacing}
    />
  );
};

export default RichEditor;
