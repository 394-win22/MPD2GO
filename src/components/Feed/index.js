import { useContext, useState } from "react";
import PostList from "./PostsList";
import { UserContext } from "components/LoggedIn";
import SearchBar from "components/SearchBar";
const Main = () => {
  const [query, setQuery] = useState("");
  const context = useContext(UserContext);

  let filteredPosts = context.postList;

  if (query != "") {
    filteredPosts = context.postList.filter((e) => {
      return (
        (e.tags && e.tags.includes(query)) ||
        e.description.toLowerCase().includes(query.toLowerCase())
      );
    });
  }
  return (
    <div className="App">
      <SearchBar setQuery={setQuery} />
      {console.log(query)}
      <PostList posts={filteredPosts} />
    </div>
  );
};

export default Main;
