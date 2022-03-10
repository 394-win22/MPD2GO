import { useEffect, useContext } from "react";
import { Card, CardHeader, List, Box, Divider } from "@mui/material";
import { UserContext } from "components/Routing";
import CommentNotification from "./CommentNotification";
import CommentReplyNotification from "./CommentReplyNotification";
import MentionNotification from "./MentionNotification";
import { ClearAllNotification } from "./ClearAllNotificationButton";
import BackButton from "../Navigation/BackButton";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { makeStyles } from "@mui/styles";

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

const useStyles = makeStyles({
  card: {
    height: "80vh",
    borderRadius: 10,
  },
  noNotification: {
    padding: "10px 16px",
    display: "flex",
    alignItems: "center",
    height: '50vh', 
    justifyContent: 'center',
    color: "gray",
  },
  cardHeader: {
    padding: "10px 10px",
  },
});

const Notifications = () => {
  const classes = useStyles();
  const context = useContext(UserContext);
  const users = context.userList;
  const userData = users.find((x) => x.uid === context.user.uid);
  const listOfNotifications = getPostList(userData);
  const hasNotifications =
    "notifications" in userData &&
    Object.values(userData.notifications).length > 0;

  useEffect(() => {}, []);

  let notificationsList;
  if (hasNotifications) {
    notificationsList = (
      <List sx={{ paddingTop: "0px" }}>
        <Divider component="li" />
        {Object.entries(listOfNotifications).map(([id, notifObj]) => {
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
              return (
                <CommentReplyNotification
                  key={id}
                  notifId={id}
                  notifObj={notifObj}
                />
              );
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
      {hasNotifications ? (
        <Card className={classes.card}>
          <CardHeader
            className={classes.cardHeader}
            avatar={<BackButton />}
            action={
              <Box
                sx={{ display: "flex", justifyContent: "space-between", m: 1 }}
              >
                <ClearAllNotification uid={userData.uid} />
              </Box>
            }
            title="Notifications"
            titleTypographyProps={{ variant: "h6" }}
          />
          {notificationsList}
        </Card>
      ) : (
        <Card className={classes.card}>
          <CardHeader
            className={classes.cardHeader}
            avatar={<BackButton />}
            title="Notifications"
            titleTypographyProps={{ variant: "h6" }}
          />

          <Box className={classes.noNotification} >
            <NotificationsNoneIcon
              fontSize="large"
              color="disabled"
              sx={{ pr: 1 }}
            />
            No New Notifications
          </Box>
        </Card>
      )}
    </>
  );
};

export default Notifications;
