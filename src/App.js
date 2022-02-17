import "./App.css";
import Main from "./components/Main";
import React, { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";

import {
  useUserState,
  getUserFromUid,
  saveUserToDb,
  useData,
} from "./utilities/firebase.js";
import CreatePost from "./components/CreatePost";
import { useEffect } from "react";
import Profile from "./components/Profile";
import PostWithThreads from "./components/PostWithThreads/PostWithThreads.js";

function getPostList(posts) {
  const listOfPost = Object.entries(posts).map(([postId, postObj]) => {
    return { ...postObj, id: postId };
  });
  // listOfEvent = listOfEvent.sort((item1, item2) => {
  //   return item1.eventTime - item2.eventTime;
  // });
  return listOfPost;
}

function getUserList(users) {
  return Object.entries(users).map(([uid, userObj]) => {
    return { ...userObj, uid: uid };
  });
}
export const UserContext = React.createContext();
function App() {
  const user = useUserState();
  const [loading, setLoading] = useState(true);
  const [postList, postListLoading, postListError] = useData(
    "/posts",
    getPostList
  );

  const [userList, userListLoading, userListError] = useData(
    "/users",
    getUserList
  );

  useEffect(() => {
    if (!user) return;
    getUserFromUid(user.uid).then((userData) => {
      if (!userData) {
        saveUserToDb(user);
      }
    });
  }, [user]);

  if (postListLoading || userListLoading) {
    return <h1 style={{marginLeft: 20}}>Loading...</h1>;
  }

  return (
    <>
      {user === undefined || user == null ? (
        <Login />
      ) : (
        <UserContext.Provider value={{
          user: user,
          postList: postList,
          userList: userList
        }}>
          <Routes>
            <Route exact path="/createPost" element={<CreatePost />} />
            <Route exact path="/profile" element={<Profile user={user} />} />
            <Route exact path="/profile/:userID" element={<Profile user={user} />} />
            <Route exact path="/"
              element={<Main user={user} users={userList} posts={postList} />}
            />
            <Route path="/createPost" element={<CreatePost />} />
            <Route path="/post/:pageId" element={<PostWithThreads />}>
            </Route>
          </Routes>
        </UserContext.Provider>

      )}
    </>
  );
}

export default App;
