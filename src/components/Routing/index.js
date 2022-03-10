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
import Loading from "components/Loading";



const REQUIRED_POST_FIELDS = ["author", "description", "title", "time"]
const getPostList = (posts) => {
  let listOfPost = Object.entries(posts).filter(([postId, postObj]) => {
    REQUIRED_POST_FIELDS.forEach((requiredField) => {
      if (!(requiredField in postObj) || postObj[requiredField] === "") {
        console.warn('bad post obj detected', postObj, requiredField)
        return false
      }
    })
    return true
  }).map(([postId, postObj]) => {
    return { ...postObj, id: postId };
  });
  listOfPost = listOfPost.sort((item1, item2) => {
    return item2.time - item1.time;
  });
  return listOfPost;
};


// required fields in user data object
// displayName, email, photoURL
const REQUIRED_USER_FIELDS = ["displayName", "email", "photoURL"]
const getUserList = (users) => {
  return Object.entries(users).filter(([uid, userObj]) => {
    REQUIRED_USER_FIELDS.forEach((requiredField) => {
      if (!(requiredField in userObj) || userObj[requiredField] === "") {
        console.warn('bad user obj detected', userObj, requiredField)
        return false
      }
    })
    return true
  }).map(([uid, userObj]) => {
    return { ...userObj, uid: uid };
  });
}

const REQUIRED_PROJECT_FIELDS = ["member", "name", "teamColor"]
const getProjectList = (project) => {
  return Object.entries(project).filter(([uid, projectObj]) => {
    REQUIRED_PROJECT_FIELDS.forEach((requiredField) => {
      if (!(requiredField in projectObj) || projectObj[requiredField] === "") {
        console.warn('bad project obj detected', projectObj, requiredField)
        return false
      }
    })
    return true
  }).map(([uid, projectObj]) => {
    return { ...projectObj, uid: uid };
  });
};

export const UserContext = createContext();

const Routing = ({ user }) => {
  const [postList, postListLoading] = useData("/posts", getPostList);
  const [userList, userListLoading] = useData("/users", getUserList);
  const [projectList, projectListLoading] = useData("/project", getProjectList);

  if (postListLoading || userListLoading || projectListLoading) {
    return (<Loading />)
  }

  // console.log(user, postList, userList, projectList)

  return (
    <UserContext.Provider
      value={{
        user: user || {},
        postList: postList || [],
        userList: userList || [],
        projectList: projectList || [],
      }}
    >
      <Navigation user={user} />
      <Container>
        <Routes>
          <Route exact path="/createPost" element={<CreatePost />} />
          <Route exact path="/profile" element={<Profile user={user} />} />
          <Route exact path="/notifications" element={<Notifications />} />
          <Route exact path="/directory" element={<Directory />} />
          {/* <Route exact path="/tutorial" element={<Tutorial />} /> */}
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
