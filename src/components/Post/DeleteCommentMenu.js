import * as React from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const DeleteCommentMenu = ({ delThreadFunction }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        // fontSize='small'
        size="small"
        sx={{ ml: 1 }}
      >
        <MoreVertIcon fontSize="small" data-cy="deleteMenu" />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
          style: {
            padding: "0px",
          },
        }}
      >
        <MenuItem
          data-cy="deleteButton"
          sx={{ fontSize: "14px", px: 3 }}
          onClick={() => {
            handleClose();
            delThreadFunction();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

// {data.author === user.uid && !isShowTextField && (
//     <Button
//       className={classes.deleteButton}
//       color="error"
//       onClick={() => {
//         deleteThread();
//       }}
//     >
//       Delete
//     </Button>
//   )}

export default DeleteCommentMenu;
