import PostList from "./PostList";
import TopNavBar from "./TopNavBar";
import { useData } from '../utilities/firebase.js';

const Main = ({postList}) => {
  
  

  console.log(postList);
  return (
    <div className="App">
      <TopNavBar/>
      <PostList posts ={postList}/>
      <br />
      <br />
      <br />
    </div>
  );
};



export default Main;
