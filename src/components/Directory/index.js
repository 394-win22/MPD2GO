import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Card,
  CardHeader,
  List,
  Avatar,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { UserContext } from "components/Routing";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import DirectorySearchBar from "components/DirectorySearchBar";
import BackButton from "../Navigation/BackButton"

const getStatus = (userData) => {
  if (!("year" in userData) || userData.year == "") {
    return "Unknown Status";
  }
  if (userData.year < new Date().getFullYear()) {
    return "Alumni";
  } else {
    return "Current Student";
  }
};

const Directory = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const users = context.userList;
  const [filter, setFilter] = useState({
    expertise: [],
    type: [],
  });
  const [query, setQuery] = useState("");

  let filteredUsers = users;

  function filtering(e) {
    let x = true;
    if (
      (!("expertise" in e) && filter.expertise.length > 0) ||
      (!("year" in e) && filter.type.length > 0)
    ) {
      return false;
    }
    if ("expertise" in e && filter.expertise.length > 0) {
      x =
        x &&
        filter.expertise.every((i) => Object.values(e.expertise).includes(i));
    }
    if (query) {
      x = x && e.displayName.toLowerCase().includes(query.toLowerCase());
    }
    if ("year" in e && filter.type.length > 0) {
      x = x && filter.type.every((i) => [getStatus(e)].includes(i));
    }
    return x;
  }

  if (query !== "" || filter.expertise.length > 0 || filter.type.length > 0) {
    filteredUsers = users.filter((e) => {
      return filtering(e);
    });
  }

  return (
    <>      
      <Card sx={{ mb:10 }} style={{ borderRadius: 10 }}>
        <CardHeader
          sx={{ padding: "10px 16px" }}
          avatar={
            <BackButton/>
          }
          title="Directory"
          titleTypographyProps={{ variant:'h6' }}
        />
        <DirectorySearchBar
        setQuery={setQuery}
        filter={filter}
        setFilter={setFilter}
      />
        <List>
          {filteredUsers.map((user) => (
            <ListItem
              component={ListItemButton}
              onClick={() => navigate(`/profile/${user.uid}`)}
              key={user.uid}
            >
              <ListItemAvatar>
                <Avatar alt={user.displayName} src={user.photoURL} />
              </ListItemAvatar>
              {"year" in user && user.year !== "" ? (
                <ListItemText
                  primary={user.displayName}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {getStatus(user)}
                      </Typography>
                      {` - Class of ${user.year}`}
                    </React.Fragment>
                  }
                />
              ) : (
                <ListItemText primary={user.displayName} />
              )}
            </ListItem>
          ))}
        </List>
      </Card>
    </>
  );
};

export default Directory;
