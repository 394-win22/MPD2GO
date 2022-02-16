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

function App() {
  const [user, setUser] = useUserState();
  const [postList, postListLoading, postListError] = useData(
    "/posts",
    getPostList
  );

  

  useEffect( () => {
    if (!user) return;
     getUserDataFromUid(user.uid).then((userData) => {
      if (!userData) {
        saveUserToDb(user);
      }
    });
  }, [user]);

  if (postListError||postListLoading){
    return <h1>Loading Posts...</h1>;

  }

  return (
    <>
      {user === undefined || user == null ? (
        <Main postList ={postList} />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home user={user} postList ={postList} />} />
            <Route path="/createPost" element={<CreatePost />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
