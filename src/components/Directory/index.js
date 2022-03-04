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

const getStatus = (userData) => {
  if (!("year" in userData) || userData.year === "") {
    return "";
  }
  if (userData.year < new Date().getFullYear()) {
    return `Alumni`;
  } else {
    return `Current Student`;
  }
};

const Directory = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const users = context.userList;
  const [, setQuery] = useState("");
  const [expertiseFilter, setExpertiseFilter] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(users);

  const filter = (e) => {
    const keyword = e.target.value;
    if (keyword !== "") {
      const lowQuery = keyword.toLowerCase();
      const results = users.filter((user) => {
        return user.displayName.toLowerCase().includes(lowQuery);
      });
      setFilteredUsers(results);
    } else {
      setFilteredUsers(users);
    }
  };
  useEffect(() => {
    if (expertiseFilter.length > 0) {
      setFilteredUsers(
        users.filter(
          (user) =>
            "expertise" in user &&
            Object.values(user.expertise).some((x) =>
              expertiseFilter.includes(x)
            )
        )
      );
    }
  }, [expertiseFilter, users]);

  return (
    <>
      <Button
        sx={{ ml: 1, mb: 2, color: "white" }}
        variant="contained"
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </Button>
      <DirectorySearchBar
        setQuery={setQuery}
        filter={filter}
        expertiseFilter={expertiseFilter}
        setExpertiseFilter={setExpertiseFilter}
      />
      <Card sx={{ mb: 10, mt: 2 }} style={{ borderRadius: 10 }}>
        <CardHeader
          sx={{ padding: "10px 16px" }}
          avatar={
            <Avatar sx={{ backgroundColor: "white", color: "#bbbbbb" }}>
              <PeopleAltIcon />
            </Avatar>
          }
          title="Directory"
          titleTypographyProps={{ sx: { fontSize: "16px" } }}
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
