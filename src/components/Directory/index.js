import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Card,
  CardHeader,
  List,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { UserContext } from "components/Routing";
import DirectorySearchBar from "components/DirectorySearchBar";
import BackButton from "../Navigation/BackButton"
import { getUserStatus } from "utilities/firebase";

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
    let x = false;
    if (
      (!("expertise" in e) && filter.expertise.length > 0) ||
      (!("isStaff" in e) && !("year" in e) && filter.type.length > 0)
    ) {
      return false;
    }
    if ("expertise" in e && filter.expertise.length > 0) {
      x =
        x ||
        filter.expertise.some((i) => Object.values(e.expertise).includes(i));
    }
    if (query) {
      x = x || e.displayName.toLowerCase().includes(query.toLowerCase());
    }
    if ("year" in e && filter.type.length > 0) {
      x = x || filter.type.some((i) => [getUserStatus(e)].includes(i));
    }
    return x;
  }

  // scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (query !== "" || filter.expertise.length > 0 || filter.type.length > 0) {
    // Filter by criteria
    filteredUsers = users.filter((e) => {
      return filtering(e);
    });
  }
  // Sort alphabetically
  filteredUsers = filteredUsers.sort((a, b) => {
    try {
      let nameA = a.displayName.toUpperCase();
      let nameB = b.displayName.toUpperCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
    } catch {
      console.log(a, b)
    }
    return 0;
  });

  return (
    <Card sx={{ mb: 10 }} style={{ borderRadius: 10 }}>
      <CardHeader
        sx={{ padding: "10px 16px" }}
        avatar={
          <BackButton />
        }
        title="Directory"
        titleTypographyProps={{ variant: 'h6' }}
      />
      <DirectorySearchBar
        setQuery={setQuery}
        filter={filter}
        setFilter={setFilter}
      />
      <List>
        {filteredUsers.sort((u1, u2) => u1.displayName.localeCompare(u2.displayName)).map((user) => (
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
                      {getUserStatus(user)}
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
  );
};

export default Directory;
