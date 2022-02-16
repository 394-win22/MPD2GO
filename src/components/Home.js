import PostList from "./PostList";
import SignOutButton from "./SignOutButton";

const Home = ({ user, postList }) => {
  console.log(user)

  return (
    <div className="App">
      { /*<TopNavBar isLoggedIn={user ? true : false} setQuery={setQuery} /> */}
        
        <SignOutButton/>
        <PostList posts={postList} />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Home;
