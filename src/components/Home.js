import PostList from "./PostList";
import {signInWithGoogle} from "../utilities/firebase";

const SignInButton = () => (
  <button className="btn btn-secondary btn-sm"
      onClick={() => signInWithGoogle()}>
    Sign In
  </button>
);

const Home = ({}) => {
  return (
    <div className="App">
      { /*<TopNavBar isLoggedIn={user ? true : false} setQuery={setQuery} /> */}
      <PostList />
      <SignInButton/>
      <br />
      <br />
      <br />
    </div>
  );
};

export default Home;
