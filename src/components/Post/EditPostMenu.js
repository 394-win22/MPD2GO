import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { Menu, MenuItem, IconButton, Dialog, DialogContentText, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { deleteData } from "../../utilities/firebase";

const EditPostMenu = ({ post, isEdit, setIsEdit }) => {
    const navigate = useNavigate();
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const deletePost = (post) => {
        deleteData(`/posts/${post.id}`);
        navigate("/");
    }


    return (
        <>
            <IconButton aria-label="menu" aria-controls={isMenuOpen ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={isMenuOpen ? 'true' : undefined}
                onClick={handleClick}
                size="small"
            >
                <MoreVertIcon fontSize='small' />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {isEdit ?
                    <MenuItem onClick={() => { handleClose(); setIsEdit(false); }}>Calcel edit</MenuItem> :
                    <MenuItem onClick={() => { handleClose(); setIsEdit(true); }}>Edit</MenuItem>
                }

                <MenuItem onClick={() => setIsDialogOpen(true)}>Delete</MenuItem>
            </Menu>


            {/* Delete confirmation Alert */}
            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                <DialogTitle>Delete Post</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this Post?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsDialogOpen(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={() => deletePost(post)} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default EditPostMenu;