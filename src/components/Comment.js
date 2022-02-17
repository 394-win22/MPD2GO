import * as React from "react";
import Card from "@mui/material/Card";
import { Avatar } from "@mui/material";
import { CardHeader } from "@mui/material";
import { Typography, IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import { UserContext } from "../App";
import moment from "moment";
import { useNavigate } from "react-router";


const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  avatar: {
    marginTop: "4px",
    width: "20px",
    height: "20px"
  },
  contentContainer: {
    marginLeft: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  time: {
    marginLeft: "70px",
    marginTop: "1px",
    color: "#888888",
    fontSize: "13px"
  }

});

export default function Comment(props) {
  const navigate = useNavigate()

  const classes = useStyles();
  const context = React.useContext(UserContext);
  const userList = context.userList
  const postAuthor = userList.find((obj) => obj.uid === props.author);
  return (
    <Box className={classes.container}>
      <IconButton sx={{marginRight: -1}} onClick={() => {navigate(`/profile/${postAuthor.uid}`)}}>
      <Avatar className={classes.avatar} src={postAuthor.photoURL} />
      </IconButton>
      <Box className={classes.contentContainer}>
        <Box className={classes.infoContainer} >
          <Typography variant="subtitle2">{postAuthor.displayName}</Typography>
          <Typography className={classes.time}>{moment(props.time).format("MMMM Do YYYY, h:mm a")}</Typography>
        </Box>
        <Typography variant="body2">
          {props.comment}
        </Typography>
      </Box>
    </Box >
  );
}
