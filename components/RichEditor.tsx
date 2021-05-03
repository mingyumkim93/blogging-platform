import React, { FunctionComponent, Dispatch, SetStateAction } from "react";
import type { Value, CellSpacing, CellPlugin } from "@react-page/editor";
import Editor from "@react-page/editor";
import slate from "@react-page/plugins-slate";
import image from "@react-page/plugins-image";
import video from "@react-page/plugins-video";

interface EditorProps {
  value: Value | null;
  readOnly?: boolean;
  setValue?: Dispatch<SetStateAction<Value | null>>;
}

const RichEditor: FunctionComponent<EditorProps> = ({
  value,
  readOnly,
  setValue
}) => {
  const cellPlugins = [slate(), image, video] as CellPlugin[];
  const cellSpacing: CellSpacing = { x: 10, y: 10 };

  return (
    <>
      <Editor
        value={value}
        readOnly={readOnly}
        onChange={setValue}
        cellPlugins={cellPlugins}
        cellSpacing={cellSpacing}
        hideEditorSidebar={true}
      />
      <style jsx>{`
        .react-page-cell-insert-new {
          width: 95vw;
        }
      `}</style>
    </>
  );
};

export default RichEditor;
