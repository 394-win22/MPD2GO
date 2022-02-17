import PostList from "./PostList";
import SignOutButton from "./SignOutButton";
import TopNavBar from "./TopNavBar";
import { useData } from "../utilities/firebase.js";

const Main = ({ user, posts, users }) => {
  return (
    <div className="App">
      <TopNavBar isLoggedIn={user ? true : false} />
      <PostList posts={posts} users={users} />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Main;
