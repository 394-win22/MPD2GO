import { useContext, useState } from "react";
import PostList from "./PostsList";
import { UserContext } from "components/LoggedIn";
import SearchBar from "components/SearchBar";
const Main = () => {
  const [query, setQuery] = useState("");
  const context = useContext(UserContext);

  return (
    <div className="App">
      <SearchBar setQuery={setQuery} />
      <PostList posts={context.postList} />
    </div>
  );
};

export default Main;
