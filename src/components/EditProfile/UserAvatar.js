import { useState } from "react";
import { Avatar, Input, Button } from "@mui/material";

//local file
import { updateData, uploadPhotoToStorage } from "utilities/firebase";

const UserAvatar = ({ userData, uid }) => {
  const [avatarURL, setAvatarURL] = useState(userData.photoURL);

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      uploadPhotoToStorage(img).then((res) => {
        setAvatarURL(res);
        updateData(`/users/${uid}`, { photoURL: res });
      });
    }
  };

  return (
    <>
      <Avatar
        alt={userData.displayName}
        src={avatarURL}
        variant="circular"
        sx={{
          height: "20vh",
          width: "20vh",
          margin: "auto",
          my: 1,
        }}
      />

      <label htmlFor="Avatar-File">
        <Input
          accept="image/*"
          id="Avatar-File"
          type="file"
          onChange={onImageChange}
          style={{ display: "none" }}
        />
        <Button variant="contained" component="span" sx={{ m: 1, width: "25ch" }}>
          Upload Profile Photo
        </Button>
      </label>
    </>
  );
};

export default UserAvatar;
