import PostList from "./PostList";
import TopNavBar from "./TopNavBar";
import { useData } from "../utilities/firebase.js";

const Main = ({ posts, users }) => {
  return (
    <div className="App">
      <TopNavBar />
      <PostList posts={posts} users={users} />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Main;
