import { useContext, useState } from "react";
import PostList from "./PostsList";
import { UserContext } from "components/LoggedIn";
import SearchBar from "components/SearchBar";
import { getUserFromUid} from "../../utilities/firebase";

const Main = () => {
  const [query, setQuery] = useState("");
  const context = useContext(UserContext);
  const [phaseFilter, setPhaseFilter] = useState([]);
  const [teamFilter, setTeamFilter] = useState([]);
  let filteredPosts = context.postList;

  if (query != "" || phaseFilter.length > 0 || teamFilter.length>0) {
    filteredPosts = context.postList.filter((e) => {
      console.log(getUserFromUid(e.author));
      return (
        e.tags &&
        e.tags.some((r) => phaseFilter.includes(r)) &&
        // getUserFromUID(e.author).teamId
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
