import { useContext, useState } from "react";
import PostList from "./PostsList";
import { UserContext } from "components/LoggedIn";
import SearchBar from "components/SearchBar";


const Main = () => {
  const [query, setQuery] = useState("");
  const context = useContext(UserContext);
  const [phaseFilter, setPhaseFilter] = useState([]);
  const [teamFilter, setTeamFilter] = useState([]);
  let filteredPosts = context.postList;

  if (query != "" || phaseFilter.length > 0 || teamFilter.length>0) {
    filteredPosts = context.postList.filter((e) => {
      console.log(context.userList.filter((u)=> u.uid ===e.author));
      return (
        e.tags &&
        e.tags.some((r) => phaseFilter.includes(r)) &&
        teamFilter.includes(context.userList.filter((u)=> u.uid ===e.author).teamId) &&
        e.description.toLowerCase().includes(query.toLowerCase())
      );
    });
    
  }
  return (
    <div className="App">
      <SearchBar
        setQuery={setQuery}
        setPhaseFilter={setPhaseFilter}
        setTeamFilter= {setTeamFilter}
        phaseFilter={phaseFilter}
        teamFilter= {teamFilter}
      />
      <PostList posts={filteredPosts} />
    </div>
  );
};

export default Main;
