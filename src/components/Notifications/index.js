import { useEffect, useContext } from "react";
import { Card, CardHeader, List, Box, Divider, Stack } from "@mui/material";
import { UserContext } from "components/Routing";
import CommentNotification from "./CommentNotification";
import CommentReplyNotification from "./CommentReplyNotification";
import MentionNotification from "./MentionNotification";
import { ClearAllNotification } from "./ClearAllNotificationButton";
import BackButton from "../Navigation/BackButton";

const getPostList = (userData) => {
  try {
    let notificationList = Object.entries(userData.notifications).map(
      ([id, notifObj]) => {
        return { ...notifObj, id: id };
      }
    );
    notificationList = notificationList.sort((item1, item2) => {
      return item2.time - item1.time;
    });
    return notificationList;
  } catch {
    return [];
  }
};

const Notifications = () => {
  const context = useContext(UserContext);
  const users = context.userList;
  const userData = users.find((x) => x.uid === context.user.uid);
  const listOfNotifications = getPostList(userData);
  const hasNotifications =
    "notifications" in userData && Object.values(userData.notifications).length > 0;

  useEffect(() => {}, []);

  let notificationsList;
  if (hasNotifications) {
    notificationsList = (
      <List sx={{ paddingTop: "0px" }}>
        <Divider component="li" />
        {Object.entries(listOfNotifications).map(([id, notifObj]) => {
          switch (notifObj.type) {
            case "comment":
              return <CommentNotification key={id} notifId={id} notifObj={notifObj} />;
            case "reply":
              return (
                <CommentReplyNotification key={id} notifId={id} notifObj={notifObj} />
              );
            case "mention":
              return <MentionNotification key={id} notifId={id} notifObj={notifObj} />;
            default:
              return <CommentNotification key={id} notifId={id} notifObj={notifObj} />;
          }
        })}
      </List>
    );
  }

  return (
    <>
      <Card sx={{ mb: 10 }} style={{ borderRadius: 10 }}>
        <CardHeader
          sx={{ padding: "10px 10px" }}
          avatar={<BackButton />}
          action={
            <Box sx={{ display: "flex", justifyContent: "space-between", m:1 }}>
            <ClearAllNotification uid={userData.uid}/>
            </Box>
          }
          title="Notifications"
          titleTypographyProps={{ variant: "h6" }}
        />
        {hasNotifications ? (
          notificationsList
        ) : (
          <Box sx={{ mb: 2, padding: "10px 16px" }}>No New Notifications</Box>
        )}
      </Card>
    </>
  );
};

export default Notifications;
