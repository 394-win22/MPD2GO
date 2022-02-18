import "./App.css";
import Main from "components/Feed";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "components/Login";

import {
  useUserState,
  getUserFromUid,
  saveUserToDb,
} from "utilities/firebase.js";
import { useEffect } from "react";

import Profile from "components/Profile";
import PostWithThreads from "components/Post/index.js";
import theme from "theme.js";
import Navigation from "components/Navigation";
import LoggedIn from "components/LoggedIn";


function App() {
  const user = useUserState();
  useEffect(() => {
    if (!user) return;
    getUserFromUid(user.uid).then((userData) => {
      if (!userData) {
        saveUserToDb(user);
      }
    });
  }, [user]);


  return (
      {user === undefined || user == null ? (
        <Login />
      ) : (
        <UserContext.Provider
          value={{
            user: user,
            postList: postList,
            userList: userList,
          }}
        >
          <Navigation user={user} />
          <Routes>
            <Route exact path="/createPost" element={<CreatePost />} />
            <Route exact path="/profile" element={<Profile user={user} />} />
            <Route
              exact
              path="/profile/:userID"
              element={<Profile user={user} />}
            />
            <Route
              exact
              path="/"
              element={<Main user={user} users={userList} posts={postList} />}
            />
            <Route path="/createPost" element={<CreatePost />} />
            <Route path="/post/:pageId" element={<PostWithThreads />}></Route>
          </Routes>
        </UserContext.Provider>
      )}

  );
}

export default App;
