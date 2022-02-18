import PostList from "./PostsList";
import React from "react";
import { UserContext } from "components/LoggedIn";


const Main = () => {
  const context = React.useContext(UserContext);

  return (
    <div className="App">
      <PostList posts={context.postList} />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Main;
