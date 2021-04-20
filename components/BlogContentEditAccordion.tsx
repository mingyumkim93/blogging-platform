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

interface Props {
  index: number;
  content: BlogContent;
  expanded: boolean;
  handleAccordionClick: (index: number) => void;
}

const BlogContentEditAccordion: FunctionComponent<Props> = ({
  index,
  content,
  expanded,
  handleAccordionClick
}) => {
  const { updateMyBlogContent } = useFirebase().auth;
  const [contentTitleDraft, setContentTitleDraft] = useState(
    Object.keys(content)[0]
  );
  const [contentDraft, setContentDraft] = useState(Object.values(content)[0]);

  function updateContent(index: number) {
    updateMyBlogContent({ [contentTitleDraft]: contentDraft }, index);
    handleAccordionClick(index);
  }

  return (
    <Accordion key={index} expanded={expanded}>
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
          onClick={() => handleAccordionClick(index)}
          expandIcon={<ExpandMore />}>
          <Typography>{Object.keys(content)}</Typography>
        </AccordionSummary>
      )}
      <AccordionDetails>
        <RichEditor
          contentDraft={contentDraft}
          setContentDraft={setContentDraft}
        />
      </AccordionDetails>
      <Button onClick={() => updateContent(index)}>Save</Button>
      <Button onClick={() => handleAccordionClick(index)}>Cancel</Button>
    </Accordion>
  );
};

export default BlogContentEditAccordion;
