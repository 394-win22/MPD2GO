import PostList from "./PostList";
import TopNavBar from "./TopNavBar";
import SignOutButton from "./SignOutButton"

const Main = ({user}) => {
  console.log(user)
  return (
    <div className="App">
            { /*<TopNavBar isLoggedIn={user ? true : false} setQuery={setQuery} /> */}
      <TopNavBar/>
      <SignOutButton/>
      <PostList />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Main;
