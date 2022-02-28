import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  List,
  Avatar,
  Box,
  Button,
  ListItem,
  Divider

} from "@mui/material";
import LinkIcon from '@mui/icons-material/Link'
import moment from "moment";
import Chip from "@mui/material/Chip";
import { UserContext } from "components/LoggedIn";
import NotificationsIcon from '@mui/icons-material/Notifications';
import CommentNotification from "./CommentNotification";
import CommentReplyNotification from "./CommentReplyNotification";
import MentionNotification from "./MentionNotification";

const Notifications = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const users = context.userList;
  const userData = users.find((x) => x.uid === context.user.uid);
  const hasNotifications = "notifications" in userData && Object.values(userData.notifications).length > 0;


  useEffect(() => {

  }, []);

  let notificationsList;
  if (hasNotifications) {
    notificationsList = (
      <List sx={{ paddingTop: "0px" }}>
        <Divider component="li" />
        {Object.entries(userData.notifications).map(([id, notifObj]) => {
          switch (notifObj.type) {
            case "comment":
              return <CommentNotification key={id} notifId={id} notifObj={notifObj} />;
            case "reply":
              return <CommentReplyNotification key={id} notifId ={id} notifObj={notifObj} />;
            case "mention":
              return <MentionNotification key={id} notifId={id} notifObj={notifObj} />;
            default:
              return <CommentNotification key={id} notifId={id} notifObj={notifObj} />;
          }
        })}
      </List >
    )
  }


  return (
    <>
      <Button
        sx={{ ml: 1, mb: 2, color: 'white' }}
        variant='contained'
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </Button>
      <Card sx={{ mx: 1, mb: 10 }} style={{ borderRadius: 10 }}>
        <CardHeader sx={{ padding: "10px 16px" }} avatar={<Avatar sx={{ backgroundColor: "white", color: "#bbbbbb" }}><NotificationsIcon /></Avatar>}
          title="Notifications" titleTypographyProps={{ sx: { fontSize: "16px" } }} />
        {(hasNotifications) ?
          notificationsList
          :
          <Box>No New Notifications</Box>
        }

      </Card>
    </>
  );
};

export default Notifications;
