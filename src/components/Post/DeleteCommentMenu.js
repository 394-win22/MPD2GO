import * as React from 'react';
import { Menu, MenuItem, IconButton, Dialog, DialogContentText, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

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
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}

            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={delThreadFunction}>Delete</MenuItem>
            </Menu>
        </>
    );
}

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