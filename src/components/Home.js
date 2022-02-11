import PostList from "./PostList";

const Home = ({}) => {
  return (
    <div className="App">
      { /*<TopNavBar isLoggedIn={user ? true : false} setQuery={setQuery} /> */}
      <PostList />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Home;
