import PostList from "./feed/PostList";
import TopNavBar from "./TopNavBar";

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
