import PostList from "./PostsList";
import React from "react";
import { UserContext } from "../../App";


const Main = () => {
  const context = React.useContext(UserContext);

  return (
    <div className="App">
      {/* <BottomNavBar isLoggedIn={context.user ? true : false} /> */}
      <PostList posts={context.postList} />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Main;
