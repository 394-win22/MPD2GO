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
import { UserContext } from "components/Routing";

const AvatarWithTag = ({ user, post, menu }) => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const projectList = context.projectList;
  let teamData
  if ("teamId" in user) {
    teamData = projectList.find((obj) => obj.uid === user.teamId);
  }

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
      action={
        menu
      }
      title={
        <Stack direction="row">
          <Typography>{user.displayName}</Typography>
          {"teamId" in user && (
            <Chip
              icon={<InsertDriveFileIcon style={{ color: teamData.textColor }} />}
              size="small"
              label="Capstone Page"
              variant="outlined"
              sx={{ mx: 1, backgroundColor: teamData.teamColor, color: teamData.textColor }}
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
