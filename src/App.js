import "./App.css";
import Main from "./components/Main";
import { useState }  from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";

import {
  useUserState,
  getUserDataFromUid,
  saveUserToDb,
  useData,
} from "./utilities/firebase.js";
import CreatePost from "./components/CreatePost";
import { useEffect } from "react";

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
  const [loading, setLoading] = useState(true);
  const [postList, postListLoading, postListError] = useData(
    "/posts",
    getPostList
  );

  const [userList, userListLoading, userListError] = useData(
    "/users",
    getUserList
  );

  if (!user) {
    setTimeout(() => {setLoading(false)}, 100)
    return
  }

  useEffect(() => {
    if (!user) return;
    getUserDataFromUid(user.uid).then((userData) => {
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
            <Route
              path="/"
              element={<Home user={user} users={userList} posts={postList} />}
            />
            <Route path="/createPost" element={<CreatePost />} />
          </Routes>
        
      )}
    </>
  );
}

export default App;
