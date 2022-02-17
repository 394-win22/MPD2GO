import PostList from "./PostList";
import SignOutButton from "./SignOutButton";

const Home = ({ user, posts, users }) => {
  console.log(user);

  return (
    <div className="App">
      {/*<TopNavBar isLoggedIn={user ? true : false} setQuery={setQuery} /> */}

      <SignOutButton />
      <PostList posts={posts} />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Home;
