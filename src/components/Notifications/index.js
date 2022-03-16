import { useEffect, useContext } from "react";
import { Card, CardHeader, List, Box, Divider } from "@mui/material";
import { UserContext } from "components/Routing";
import CommentNotification from "./CommentNotification";
import CommentReplyNotification from "./CommentReplyNotification";
import MentionNotification from "./MentionNotification";
import { ClearAllNotification } from "./ClearAllNotificationButton";
import BackButton from "../Navigation/BackButton";
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  card: {
    height: "80vh",
    borderRadius: 10,
  },
  noNotification: {
    padding: "10px 16px",
    display: "flex",
    flexDirection: "column",
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

  let notificationsObj = {};
  if ("notifications" in userData) notificationsObj = userData.notifications;


  const hasNotifications =
    "notifications" in userData &&
    Object.values(userData.notifications).length > 0;

  // scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  let notificationsList;
  if (hasNotifications) {
    console.log(notificationsObj);
    notificationsList = (
      <List sx={{ paddingTop: "0px" }}>
        <Divider component="li" />
        {Object.entries(notificationsObj).map(([id, notifObj]) => {
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
            sx={{ pt: 1, px: 2, display: "flex", flexDirection: "row", alignItems: "flex-start", pb: 0 }}
            avatar={
              <BackButton />
            }
            title="Notifications"
            titleTypographyProps={{ variant: 'h6', mt: 0.5 }}
            action={
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 1, mr: 1 }}
              >
                <ClearAllNotification uid={userData.uid} />
              </Box>
            }
          />
          {notificationsList}
        </Card>
      ) : (
        <Card className={classes.card}>
          <CardHeader
            sx={{ padding: "10px 16px" }}
            avatar={
              <BackButton />
            }
            title="Notifications"
            titleTypographyProps={{ variant: 'h6' }}
          />

          <Box className={classes.noNotification} >
            <NotificationsOffIcon
              fontSize="large"
              color="disabled"
              sx={{ pr: 1, width: "100px", height: "auto", mb: 2 }}
            />
            No New Notifications
          </Box>
        </Card>
      )
      }
    </>
  );
};

export default Notifications;
