import { FunctionComponent, useState, useEffect, MouseEvent } from "react";
import { useFirebase } from "lib/firebase/FirebaseProvider";
import TextField from "@material-ui/core/TextField";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMore from "@material-ui/icons/ExpandMore";
import CollapseProps from "types/CollapseProps";
import {
  ContentState,
  convertToRaw,
  Editor,
  EditorState,
  RawDraftContentState
} from "draft-js";
import "draft-js/dist/Draft.css";
import BlogContentEditAccordion from "components/BlogContentEditAccordion";
import BlogContent from "types/BlogContent";

const BlogContentsEditCollapse: FunctionComponent<CollapseProps> = ({
  opened,
  cancel
}) => {
  const { user } = useFirebase().auth;
  const { contents } = user?.blogData!;
  const [contentsDraft, setContentsDraft] = useState<BlogContent[]>(
    contents || []
  );
  const [expandedContents, setExpandedContents] = useState<number[]>([]);
  function handleCancel() {
    cancel();
  }

  function handleAccordionClick(index: number) {
    setExpandedContents((prev) => {
      if (prev.includes(index))
        return prev.filter((expandedIndex) => expandedIndex !== index);
      return [...prev, index];
    });
  }

  function addNewContent() {
    const newContentsDraft = [
      ...contentsDraft,
      { "New item": convertToRaw(ContentState.createFromText("")) }
    ];
    setContentsDraft(newContentsDraft);
  }

  return (
    <Collapse in={opened}>
      {contentsDraft &&
        contentsDraft.map((content, index) => (
          <BlogContentEditAccordion
            key={index}
            content={content}
            expanded={expandedContents.includes(index)}
            handleAccordionClick={handleAccordionClick}
            index={index}
          />
        ))}
      <Button onClick={addNewContent}>Add new</Button>
      <Button onClick={handleCancel}>Cancel</Button>
    </Collapse>
  );
};

export default BlogContentsEditCollapse;
