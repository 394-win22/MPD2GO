import { useContext, useState } from "react";
import PostList from "./PostsList";
import { UserContext } from "components/Routing";
import PostSearchBar from "components/PostSearchBar";

const Main = () => {
  const [query, setQuery] = useState("");
  const context = useContext(UserContext);
  const [phaseFilter, setPhaseFilter] = useState([]);
  let filteredPosts = context.postList;

  if (query != "" || phaseFilter.length > 0) {
    filteredPosts = context.postList.filter((e) => {
      return (
        e.tags &&
        e.tags.some((r) => phaseFilter.includes(r)) &&
        e.description.toLowerCase().includes(query.toLowerCase())
      );
    });
  }
  return (
    <div className="App">
      <PostSearchBar
        setQuery={setQuery}
        setPhaseFilter={setPhaseFilter}
        phaseFilter={phaseFilter}
      />
      <PostList posts={filteredPosts} />
    </div>
  );
};

export default Main;
