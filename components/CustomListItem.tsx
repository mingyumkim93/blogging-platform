import { FunctionComponent, useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";
import Collapse from "@material-ui/core/Collapse";
import CustomListItemProps from "types/CustomListItemProps";

const CustomListItem: FunctionComponent<CustomListItemProps> = ({
  primary,
  secondary,
  selectable,
  collapse
}) => {
  const [opened, setOpened] = useState(false);

  function cancel() {
    setOpened(false);
  }

  return (
    <>
      <ListItem>
        <ListItemText primary={primary} secondary={secondary} />
        {selectable && (
          <IconButton edge="end" onClick={() => setOpened(!opened)}>
            {opened ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        )}
      </ListItem>
      {collapse && collapse({ opened, cancel })}
    </>
  );
};

export default CustomListItem;
