import { FunctionComponent, useEffect, useState } from "react";
import { useFirebase } from "lib/firebase/FirebaseProvider";
import CollapseProps from "types/CollapseProps";
import BlogContentEditAccordion from "components/BlogContentEditAccordion";
import BlogContent from "types/BlogContent";
import { v4 as uuidv4 } from "uuid";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";

const BlogContentsEditCollapse: FunctionComponent<CollapseProps> = ({
  opened,
  cancel
}) => {
  const { user, updateMyBlogContents } = useFirebase().auth;
  const { contents } = user?.blogData!;
  const [contentsDraft, setContentsDraft] = useState<BlogContent[]>(contents);
  const [expandedContents, setExpandedContents] = useState<string[]>([]);

  useEffect(() => {
    if (contentsDraft) {
      const unsavedContents = contentsDraft.filter(
        (content) =>
          !content.isSaved &&
          !contents.some((savedContent) => savedContent.id === content.id)
      );

      setContentsDraft([...contents, ...unsavedContents]);
    }
  }, [contents]);

  function handleAccordionClick(id: string) {
    setExpandedContents((prev) => {
      if (prev.includes(id))
        return prev.filter((expandedId) => expandedId !== id);
      return [...prev, id];
    });
  }

  function saveNewContent(content: BlogContent) {
    const newContents = [...contents, content];
    updateMyBlogContents(newContents);
  }

  function deleteSavedContent(id: string) {
    const newContents = contents.filter((content) => content.id !== id);
    updateMyBlogContents(newContents);
  }

  function updateSavedContent(updatingContent: BlogContent) {
    const newContents = contents.map((content) => {
      if (content.id === updatingContent.id) return updatingContent;
      return content;
    });
    updateMyBlogContents(newContents);
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
            saveNewContent={saveNewContent}
            deleteSavedContent={deleteSavedContent}
            updateSavedContent={updateSavedContent}
          />
        ))}
      <div className={"button-group"}>
        <Button onClick={addNewContent}>Add new</Button>
        <Button onClick={() => cancel()}>Cancel</Button>
      </div>
    </Collapse>
  );
};

export default BlogContentsEditCollapse;
