import { useState } from "react";
import {
    Button,
    Menu,
    MenuItem
  } from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const DeleteThread = (deleteThread, classes) => {

    const [delAnchor, setDelAnchor] = useState(null);

    const open = Boolean(delAnchor);

    const handleClick = (event) => {
      setDelAnchor(event.currentTarget);
    };

    const handleClose = () => {
      setDelAnchor(null);
    };

    return (
        <>
            <Button
            className={classes.deleteButton}
            onClick={handleClick}
            sx={{ width: "1%" }}
            >
                <MoreHorizIcon/>
            </Button>
            <Menu
            id="basic-menu"
            anchorEl={delAnchor}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
            >
                <MenuItem onClick={() => deleteThread.deleteThread()}>Delete</MenuItem>
            </Menu>
        </>
    );
}

export default DeleteThread;