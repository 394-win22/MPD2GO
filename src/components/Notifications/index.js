import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Avatar,
  Box,
  Button
} from "@mui/material";
import LinkIcon from '@mui/icons-material/Link'
import moment from "moment";
import Chip from "@mui/material/Chip";
import { UserContext } from "components/LoggedIn";
import NotificationsIcon from '@mui/icons-material/Notifications';

const Notifications = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const users = context.userList;
  const userData = users.find((x) => x.uid === context.user.uid);
  const hasNotifications = "notifications" in userData && Object.values(userData.notifications).length > 0;

  console.log(hasNotifications);


  useEffect(() => {

  }, []);


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
        <CardHeader avatar={<Avatar sx={{ backgroundColor: "white", color: "#bbbbbb" }}><NotificationsIcon /></Avatar>}
          title="Notifications" titleTypographyProps={{ sx: { fontSize: "16px" } }} />
        <CardContent>
          {(hasNotifications) ?
            <> </> :
            <Box>No New Notifications</Box>
          }

        </CardContent>
      </Card>
    </>
  );
};

export default Notifications;
