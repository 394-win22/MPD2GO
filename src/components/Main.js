import PostList from "./feed/PostList";
import TopNavBar from "./TopNavBar";
import React from "react";
import { UserContext } from "../App";


const Main = () => {
  const context = React.useContext(UserContext);

  return (
    <div className="App">
      <TopNavBar isLoggedIn={context.user ? true : false} />
      <PostList posts={context.postList} />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Main;
