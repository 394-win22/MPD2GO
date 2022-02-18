import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import moment from "moment";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import { Typography } from "@mui/material/";
import { UserContext } from "../../App";
import { makeStyles } from "@mui/styles";


const getUserFromUID = (uid, users) => {
  return users.filter((user) => user.uid === uid)[0];
};

const useStyles = makeStyles({
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    '&:hover': {
      cursor: "pointer"
    }
  },
});


export default function Post({ post }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const context = React.useContext(UserContext);
  const users = context.userList;
  const user = getUserFromUID(post.author, users);


  return (
    <Card className={classes.card} sx={{ m: 5 }} onClick={() => { navigate(`/post/${post.id}`); }}>
      <CardHeader
        align="left"
        avatar={<Avatar src={user.photoURL} aria-label="avatar" />}
        title={user.displayName}
        subheader={moment(post.time).format("MMMM Do YYYY, h:mm a")} />
      <CardContent>
        <Typography variant="body2" color="text.secondary" align="left">
          {post.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
