import { FunctionComponent, useState } from "react";
import { useFirebase } from "lib/firebase/FirebaseProvider";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import CollapseProps from "types/CollapseProps";
import BlogContentEditAccordion from "components/BlogContentEditAccordion";
import BlogContent from "types/BlogContent";
import { v4 as uuidv4 } from "uuid";

const BlogContentsEditCollapse: FunctionComponent<CollapseProps> = ({
  opened,
  cancel
}) => {
  const { user } = useFirebase().auth;
  const { contents } = user?.blogData!;
  const [contentsDraft, setContentsDraft] = useState<BlogContent[]>(
    contents || []
  );
  const [expandedContents, setExpandedContents] = useState<string[]>([]);

  function handleAccordionClick(id: string) {
    setExpandedContents((prev) => {
      if (prev.includes(id))
        return prev.filter((expandedId) => expandedId !== id);
      return [...prev, id];
    });
  }

  function addNewContent() {
    const id = uuidv4();
    const newContentsDraft: BlogContent[] = [
      ...contentsDraft,
      { id, title: "New item", value: null }
    ];
    setContentsDraft(newContentsDraft);
    setExpandedContents((prev) => [...prev, id]);
  }

  function removeNotSavedContent(id: string) {
    const remain = contentsDraft.filter((content) => content.id !== id);
    setContentsDraft(remain);
  }

  return (
    <Collapse in={opened}>
      {contentsDraft &&
        contentsDraft.map((content) => (
          <BlogContentEditAccordion
            key={content.id}
            content={content}
            expanded={expandedContents.includes(content.id)}
            handleAccordionClick={handleAccordionClick}
            removeNotSavedContent={removeNotSavedContent}
          />
        ))}
      <Button onClick={addNewContent}>Add new</Button>
      <Button onClick={() => cancel()}>Cancel</Button>
    </Collapse>
  );
};

export default BlogContentsEditCollapse;
