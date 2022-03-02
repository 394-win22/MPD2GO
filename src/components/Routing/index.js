import { createContext } from "react";
import { Route, Routes } from "react-router-dom";
import { useData } from "utilities/firebase.js";

import { Container } from "@mui/material";

import CreatePost from "components/CreatePost";
import Profile from "components/Profile";
import PostWithThreads from "components/Post/index.js";
import Navigation from "components/Navigation";
import Project from "components/Project";
import Notifications from "components/Notifications";
import NotFound from "components/NotFound";
import Directory from "components/Directory";

import Main from "components/Feed";

const getPostList = (posts) => {
  const listOfPost = Object.entries(posts).map(([postId, postObj]) => {
    return { ...postObj, id: postId };
  });
  return listOfPost;
};

const getUserList = (users) => {
  return Object.entries(users).map(([uid, userObj]) => {
    return { ...userObj, uid: uid };
  });
};

const getProjectList = (project) => {
  return Object.entries(project).map(([uid, projectObj]) => {
    return { ...projectObj, uid: uid };
  });
};

export const UserContext = createContext();

const Routing = ({ user }) => {
  const [postList, postListLoading] = useData("/posts", getPostList);

  const [userList, userListLoading] = useData("/users", getUserList);

  const [projectList, projectListLoading] = useData("/project", getProjectList);

  if (postListLoading || userListLoading || projectListLoading) {
    return <h1 style={{ marginLeft: 20 }}>Loading...</h1>;
  }

  return (
    <UserContext.Provider
      value={{
        user: user,
        postList: postList,
        userList: userList,
        projectList: projectList,
      }}
    >
      <Navigation user={user} />
      <Container>
        <Routes>
          <Route exact path="/createPost" element={<CreatePost />} />
          <Route exact path="/profile" element={<Profile user={user} />} />
          <Route exact path="/notifications" element={<Notifications />} />
          <Route exact path="/directory" element={<Directory/>} />
          <Route
            exact
            path="/profile/:userID"
            element={<Profile user={user} />}
          />
          <Route exact path="/" element={<Main />} />
          <Route path="/createPost" element={<CreatePost />} />
          <Route path="/post/:pageId" element={<PostWithThreads />}></Route>
          <Route path="/project/:projectId" element={<Project user={user} />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </UserContext.Provider>
  );
};

export default Routing;
