import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  ListItem,
  Typography,
  ListItemAvatar,
  ListItemText,
  Avatar,
  ListItemButton,
  Divider,
} from "@mui/material";
import moment from "moment";
import { UserContext } from "components/Routing";

import RichTextEditor from "@mantine/rte";

import { markNotificationAsRead } from "utilities/notifications";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import IconButton from "@mui/material/IconButton";


const CommentNotification = ({ notifId, notifObj }) => {
  const navigate = useNavigate();
  console.log(notifId)
  const context = useContext(UserContext);
  const users = context.userList;

  const authorData = users.find((x) => x.uid === notifObj.senderUid);

  const title = `${authorData.displayName} commented on your post`;

  const handleNotificationClicked = (e) => {
    console.log("cliocked");
    e.stopPropagation()
    markNotificationAsRead(context.user.uid, notifId);
    navigate(`/post/${notifObj.postId}`);
  };

  return (
    <>
      <ListItem
        component={ListItemButton}
        onClick={handleNotificationClicked}
        alignItems="flex-start"
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="Mark this notification as read"
            onClick={(event) => {
              event.stopPropagation();
              console.log("HERE");
              markNotificationAsRead(context.user.uid, notifId);
            }}
          >
            <MarkChatReadIcon />
          </IconButton>
        }
        sx={{ height: "100%", width: "100%", padding: "18px" }}
      >
        <ListItemAvatar>
          <Avatar src={authorData.photoURL} />
        </ListItemAvatar>
        <ListItemText
          sx={{ margin: "0px" }}
          primary={title}
          secondary={
            <React.Fragment>
              <RichTextEditor
                readOnly
                value={notifObj.content}
                sx={{ border: "none" }}
              />
              <Typography
                sx={{ display: "inline-block" }}
                component="span"
                variant="body3"
                color="text.secondary"
              >
                {moment(notifObj.time).format("MMMM Do YYYY, h:mm a")}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider component="li" />
    </>
  );
};

export default CommentNotification;
