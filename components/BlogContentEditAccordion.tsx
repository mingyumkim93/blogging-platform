import { FunctionComponent, useState } from "react";
import BlogContent from "types/BlogContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMore from "@material-ui/icons/ExpandMore";
import RichEditor from "components/RichEditor";
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
  saveNewContent: (content: BlogContent) => void;
  deleteSavedContent: (id: string) => void;
  updateSavedContent: (contnet: BlogContent) => void;
}

const BlogContentEditAccordion: FunctionComponent<Props> = ({
  content,
  expanded,
  handleAccordionClick,
  removeNotSavedContent,
  saveNewContent,
  deleteSavedContent,
  updateSavedContent
}) => {
  const [contentTitleDraft, setContentTitleDraft] = useState(content.title);
  const [value, setValue] = useState<Value | null>(content.value);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [hasBeenModified, setHasBeenModified] = useState(false);

  function handleSave() {
    const savingContent = {
      ...content,
      title: contentTitleDraft,
      value,
      isSaved: true
    };
    if (content.isSaved) updateSavedContent(savingContent);
    else saveNewContent(savingContent);
    handleAccordionClick(content.id);
  }

  function handleCancel() {
    if (!content.isSaved) removeNotSavedContent(content.id);
    else {
      setContentTitleDraft(content.title);
      handleAccordionClick(content.id);
      setValue(content.value);
    }
    setCancelDialogOpen(false);
    setHasBeenModified(false);
  }

  function handleDelete() {
    deleteSavedContent(content.id);
    setDeleteDialogOpen(false);
  }

  return (
    <Accordion expanded={expanded}>
      {expanded ? (
        <AccordionSummary>
          <TextField
            fullWidth
            value={contentTitleDraft}
            onChange={(e) => {
              setContentTitleDraft(e.target.value);
              setHasBeenModified(true);
            }}
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
        <RichEditor
          value={value}
          onChange={(v: Value) => {
            setValue(v);
            setHasBeenModified(true && expanded);
          }}
        />
      </AccordionDetails>
      <div className={"button-group"}>
        <Button onClick={() => handleSave()}>Save</Button>
        <Button
          onClick={() =>
            hasBeenModified ? setCancelDialogOpen(true) : handleCancel()
          }>
          Cancel
        </Button>
        {content.isSaved && (
          <Button onClick={() => setDeleteDialogOpen(true)}>Delete</Button>
        )}
      </div>

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
          <Button onClick={() => handleDelete()} color="primary">
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

      <Dialog
        open={cancelDialogOpen}
        onClose={() => setCancelDialogOpen(false)}>
        <DialogTitle id="alert-dialog-title">
          Cancel Editing content of {contentTitleDraft}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to cancel editing? Unsaved changes will be
            disappeared.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCancel()} color="primary">
            Yes
          </Button>
          <Button
            onClick={() => setCancelDialogOpen(false)}
            color="primary"
            autoFocus>
            Continue Editing
          </Button>
        </DialogActions>
      </Dialog>
    </Accordion>
  );
};

export default BlogContentEditAccordion;
