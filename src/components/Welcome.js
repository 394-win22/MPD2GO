import PostList from "./PostList";

const Welcome = ({}) => {
  return (
    <div className="App">
      {/* <TopNavBar isLoggedIn={user ? true : false} setQuery={setQuery} /> */}
      <PostList />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Welcome;
