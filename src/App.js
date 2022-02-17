import "./App.css";
import Main from "./components/Main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TopNavBar from "./components/TopNavBar";
import Home from "./components/Home";
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
        <Main posts={postList} users={userList} />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Home user={user} users={userList} posts={postList} />}
            />
            <Route path="/createPost" element={<CreatePost />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
