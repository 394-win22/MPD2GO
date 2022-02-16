import PostList from "./PostList";
import SignOutButton from "./SignOutButton";
import TopNavBar from "./TopNavBar";

const Main = ({ user }) => {
  console.log(user)

  return (
    <div className="App">
      { /*<TopNavBar isLoggedIn={user ? true : false} setQuery={setQuery} /> */}
        <TopNavBar isLoggedIn={user ? true : false} />
        {/* <SignOutButton/> */}
        <PostList />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Main;
