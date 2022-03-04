import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  List,
  Avatar,
  Box,
  Button,
  ListItem,
  Divider,
  Stack,
} from "@mui/material";
import { UserContext } from "components/Routing";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CommentNotification from "./CommentNotification";
import MentionNotification from "./MentionNotification";
import BackButton from "../Navigation/BackButton";

const Notifications = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const users = context.userList;
  const userData = users.find((x) => x.uid === context.user.uid);
  const hasNotifications =
    "notifications" in userData &&
    Object.values(userData.notifications).length > 0;

  useEffect(() => {}, []);

  let notificationsList;
  if (hasNotifications) {
    notificationsList = (
      <List sx={{ paddingTop: "0px" }}>
        <Divider component="li" />
        {Object.entries(userData.notifications).map(([id, notifObj]) => {
          switch (notifObj.type) {
            case "comment":
              return (
                <CommentNotification
                  key={id}
                  notifId={id}
                  notifObj={notifObj}
                />
              );
            case "reply":
              return <ListItem key={id} />;
            case "mention":
              return (
                <MentionNotification
                  key={id}
                  notifId={id}
                  notifObj={notifObj}
                />
              );
            default:
              return (
                <CommentNotification
                  key={id}
                  notifId={id}
                  notifObj={notifObj}
                />
              );
          }
        })}
      </List>
    );
  }

  return (
    <>
      <Card sx={{ mb: 10 }} style={{ borderRadius: 10 }}>
        <CardHeader
          avatar={
            <BackButton />
          }
          title="Notifications"
          titleTypographyProps={{ sx: { fontSize: "16x" } ,variant:"h6" }}
        />
        {hasNotifications ? (
          notificationsList
        ) : (
          <Box sx={{ margin: 2, paddingLeft: 1 }}>No New Notifications</Box>
        )}
      </Card>
    </>
  );
};

export default Notifications;
