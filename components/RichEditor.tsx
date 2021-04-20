import React, {
  FunctionComponent,
  useState,
  useRef,
  KeyboardEvent,
  MouseEvent
} from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  convertFromRaw,
  convertToRaw,
  RawDraftContentState,
  DraftEditorCommand,
  ContentBlock,
  DraftHandleValue
} from "draft-js";

interface EditorProps {
  setContentDraft: (contentState: RawDraftContentState) => void;
  contentDraft: RawDraftContentState;
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
};

const RichEditor: FunctionComponent<EditorProps> = ({
  setContentDraft,
  contentDraft
}) => {
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(convertFromRaw(contentDraft))
  );
  const editor = useRef<Editor | null>(null);
  function focus() {
    (editor.current as Editor).focus();
  }

  function onChange(editorState: EditorState) {
    setEditorState(editorState);
    setContentDraft(convertToRaw(editorState.getCurrentContent()));
  }

  function handleKeyCommand(
    command: DraftEditorCommand,
    editorState: EditorState
  ): DraftHandleValue {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return "handled";
    }
    return "not-handled";
  }

  function mapKeyToEditorCommand(e: KeyboardEvent) {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth */);
      if (newEditorState !== editorState) {
        onChange(newEditorState);
      }
      return null;
    }
    return getDefaultKeyBinding(e);
  }

  function toggleBlockType(blockType: string) {
    onChange(RichUtils.toggleBlockType(editorState, blockType));
  }

  function toggleInlineStyle(inlineStyle: string) {
    onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  }

  function getBlockStyle(block: ContentBlock): string {
    switch (block.getType()) {
      case "blockquote":
        return "RichEditor-blockquote";
      default:
        return "";
    }
  }

  return (
    <div className="RichEditor-root">
      <BlockStyleControls
        editorState={editorState}
        onToggle={toggleBlockType}
      />
      <InlineStyleControls
        editorState={editorState}
        onToggle={toggleInlineStyle}
      />
      <div
        className={
          "RichEditor-editor" + !editorState.getCurrentContent().hasText() &&
          editorState.getCurrentContent().getBlockMap().first().getType() !==
            "unstyled"
            ? " RichEditor-hidePlaceholder"
            : ""
        }
        onClick={focus}>
        <Editor
          blockStyleFn={getBlockStyle}
          customStyleMap={styleMap}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={mapKeyToEditorCommand}
          onChange={onChange}
          ref={editor}
          spellCheck={true}
        />
      </div>
    </div>
  );
};

interface StyleButtonProps {
  onToggle: (style: string) => void;
  style: string;
  active: boolean;
  label: string;
}

const StyleButton: FunctionComponent<StyleButtonProps> = ({
  onToggle,
  style,
  active,
  label
}) => {
  function handleToggle(e: MouseEvent) {
    e.preventDefault();
    onToggle(style);
  }

  return (
    <span
      className={
        active
          ? "RichEditor-styleButton RichEditor-activeButton"
          : "RichEditor-styleButton"
      }
      onMouseDown={handleToggle}>
      {label}
    </span>
  );
};

interface StyleControlsProps {
  editorState: EditorState;
  onToggle: (style: string) => void;
}

const BlockStyleControls: FunctionComponent<StyleControlsProps> = ({
  editorState,
  onToggle
}) => {
  const BLOCK_TYPES = [
    { label: "H1", style: "header-one" },
    { label: "H2", style: "header-two" },
    { label: "H3", style: "header-three" },
    { label: "H4", style: "header-four" },
    { label: "H5", style: "header-five" },
    { label: "H6", style: "header-six" },
    { label: "Blockquote", style: "blockquote" },
    { label: "UL", style: "unordered-list-item" },
    { label: "OL", style: "ordered-list-item" },
    { label: "Code Block", style: "code-block" }
  ];
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

const InlineStyleControls: FunctionComponent<StyleControlsProps> = ({
  editorState,
  onToggle
}) => {
  const INLINE_STYLES = [
    { label: "Bold", style: "BOLD" },
    { label: "Italic", style: "ITALIC" },
    { label: "Underline", style: "UNDERLINE" },
    { label: "Monospace", style: "CODE" }
  ];
  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

export default RichEditor;
