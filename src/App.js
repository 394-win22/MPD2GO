import "./App.css";
import Main from "./components/Main";
import { useState }  from 'react';
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

function App() {
  const [user, setUser] = useUserState();
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

  if (postListError || postListLoading || userListLoading) {
    return <h1>Loading Posts...</h1>;
  }

  return (
    <>
      {user === undefined || user == null ? (
        <Login />
      ) : (

          <Routes>
            <Route exact path="/createPost" element={<CreatePost />} />
            <Route exact path="/profile" element={<Profile user={user} />} />
            <Route exact path="/profile/:id" element={<Profile user={user} />} />
            <Route exact path="/"
              element={<Main user={user} users={userList} posts={postList} />}
            />
          </Routes>

      )}
    </>
  );
}

export default App;
