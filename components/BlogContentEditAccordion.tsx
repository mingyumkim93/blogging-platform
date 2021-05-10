import { FunctionComponent, useState } from "react";
import { useFirebase } from "lib/firebase/FirebaseProvider";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMore from "@material-ui/icons/ExpandMore";
import RichEditor from "components/RichEditor";
import BlogContent from "types/BlogContent";
import { Value } from "@react-page/editor";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

interface Props {
  content: BlogContent;
  expanded: boolean;
  handleAccordionClick: (id: string) => void;
  removeNotSavedContent: (id: string) => void;
}

const BlogContentEditAccordion: FunctionComponent<Props> = ({
  content,
  expanded,
  handleAccordionClick,
  removeNotSavedContent
}) => {
  const { updateMyBlogContent } = useFirebase().auth;
  const [contentTitleDraft, setContentTitleDraft] = useState(content.title);
  const [value, setValue] = useState<Value | null>(content.value);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  function updateContent() {
    updateMyBlogContent({
      id: content.id,
      title: contentTitleDraft,
      value,
      isSaved: true,
      updatedAt: new Date()
    });
    handleAccordionClick(content.id);
  }

  function handleCancel() {
    if (!content.isSaved) removeNotSavedContent(content.id);
    else {
      setContentTitleDraft(content.title);
      handleAccordionClick(content.id);
      setValue(content.value);
    }
  }

  function deleteContent() {
    console.log("delete");
    //TODO: delete content
    setDeleteDialogOpen(false);
  }

  return (
    <Accordion expanded={expanded}>
      {expanded ? (
        <AccordionSummary>
          <TextField
            fullWidth
            value={contentTitleDraft}
            onChange={(e) => setContentTitleDraft(e.target.value)}
          />
        </AccordionSummary>
      ) : (
        <AccordionSummary
          onClick={() => handleAccordionClick(content.id)}
          expandIcon={<ExpandMore />}>
          <Typography>{content.title}</Typography>
        </AccordionSummary>
      )}
      <AccordionDetails>
        <RichEditor value={value} setValue={setValue} />
      </AccordionDetails>
      <Button onClick={() => updateContent()}>Save</Button>
      <Button onClick={() => handleCancel()}>Cancel</Button>
      {content.isSaved && (
        <Button onClick={() => setDeleteDialogOpen(true)}>Delete</Button>
      )}

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle id="alert-dialog-title">
          Delete content of {contentTitleDraft}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => deleteContent()} color="primary">
            Delete
          </Button>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            color="primary"
            autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Accordion>
  );
};

export default BlogContentEditAccordion;
