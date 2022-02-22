import * as React from 'react';
import { Box, TextField, Button, Divider, Link, Typography, Modal, Stack, IconButton } from "@mui/material";
import { Send as SendIcon } from '@mui/icons-material'

import { forgotPassword } from "utilities/firebase";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ResetPasswordModal = ({ open, handleClose }) => {
    const handleSubmitModal = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        forgotPassword(data.get('email'));
    };


    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Reset Password
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Please enter your account email address below.
                </Typography>
                <Stack direction="row" alignItems="center">
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmitModal}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <IconButton sx={{ p: '10px', paddingRight: '10px' }} type="submit">
                            <SendIcon />
                        </IconButton>
                    </Box>
                </Stack>

            </Box>
        </Modal>
    )
}

export default ResetPasswordModal;