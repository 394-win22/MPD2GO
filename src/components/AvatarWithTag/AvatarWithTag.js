import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, CardHeader, Avatar, Stack, Chip } from "@mui/material";
import moment from "moment";
import { UserContext } from "components/Routing";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
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
      sx={{
        padding: 0,
        pl: 2,
        mt: 0,
        mb: 2
      }}
      avatar={
        <Avatar
          src={user.photoURL}
          sx={{ width: "35px", height: "35px" }}
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
      subheaderTypographyProps={{ style: { fontSize: "12px", marginTop: "5px" } }}
      title={
        <Stack direction="row" spacing={3} sx={{ alignItems: "flex-end" }}>
          <Typography sx={{ fontSize: "15px" }} >{user.displayName}</Typography>
          {"teamId" in user && (
            <Chip
              size="small"
              label="Capstone Page"
              variant="outlined"
              icon={<InsertDriveFileIcon style={{ color: "white" }} />}
              sx={{
                marginLeft: "30px !important",
                marginBottom: "2px !important",
                mx: 1,
                backgroundColor: teamData.teamColor,
                color: teamData.textColor,

                px: 1,
                // fontSize: "12px",
                border: 0,
                "&:hover": {
                  backgroundColor: shade(teamData.teamColor, -0.3) + " !important"
                },
                "&:active": {
                  backgroundColor: shade(teamData.teamColor, -0.5) + " !important"
                },
              }}
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

function hex2(c) {
  c = Math.round(c);
  if (c < 0) c = 0;
  if (c > 255) c = 255;

  var s = c.toString(16);
  if (s.length < 2) s = "0" + s;

  return s;
}

function color(r, g, b) {
  return "#" + hex2(r) + hex2(g) + hex2(b);
}

function shade(col, light) {

  // TODO: Assert that col is good and that -1 < light < 1

  var r = parseInt(col.substr(1, 2), 16);
  var g = parseInt(col.substr(3, 2), 16);
  var b = parseInt(col.substr(5, 2), 16);

  if (light < 0) {
    r = (1 + light) * r;
    g = (1 + light) * g;
    b = (1 + light) * b;
  } else {
    r = (1 - light) * r + light * 255;
    g = (1 - light) * g + light * 255;
    b = (1 - light) * b + light * 255;
  }

  return color(r, g, b);
}
export default AvatarWithTag;
