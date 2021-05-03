import { FunctionComponent, useState } from "react";
import { useFirebase } from "lib/firebase/FirebaseProvider";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import CollapseProps from "types/CollapseProps";
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
    const newContentsDraft = [...contentsDraft, { "New item": null }];
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
