import React from "react";
import Button from "@mui/material/Button";

export const EditPostButton = ({ post, isEdit, setIsEdit }) => {
  return (
    <>
      {isEdit ? (
        <>
          <Button
            onClick={() => setIsEdit(false)}
            variant="contained"
            color="secondary"
            sx={{
              mb: 2,
              color: "white",
              mr: 1,
            }}
          >
            Cancel Edit
          </Button>
        </>
      ) : (
        <Button
          onClick={() => setIsEdit(true)}
          variant="contained"
          color="secondary"
          sx={{
            mb: 2,
            color: "white",
            mr: 1,
          }}
        >
          Edit Post
        </Button>
      )}
    </>
  );
};
