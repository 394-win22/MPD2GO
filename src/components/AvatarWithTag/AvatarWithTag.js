import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  CardHeader,
  CardContent,
  Avatar,
  Card,
  Box,
  Stack,
} from "@mui/material/";
import moment from "moment";
import Chip from "@mui/material/Chip";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

const AvatarWithTag = ({ user, post }) => {
  const navigate = useNavigate();
  return (
    <CardHeader
      align="left"
      avatar={
        <Avatar
          src={user.photoURL}
          aria-label="avatar"
          onClick={(event) => {
            event.stopPropagation();
            navigate(`/profile/${user.uid}`);
          }}
        />
      }
      title={
        <Stack direction="row">
          <Typography>{user.displayName}</Typography>
          {"teamId" in user && (
            <Chip
              icon={<InsertDriveFileIcon />}
              size="small"
              label="Capstone Page"
              variant="outlined"
              sx={{ mx: 1 }}
              onClick={(event) => {
                event.stopPropagation();
                navigate(`/project/${user.teamId}`);
              }}
            />
          )}
        </Stack>
      }
      subheader={moment(post.time).format("MMMM Do YYYY, h:mm a")}
    />
  );
};

export default AvatarWithTag;
