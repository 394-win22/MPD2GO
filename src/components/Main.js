import PostList from "./PostList";
import TopNavBar from "./TopNavBar";
import { useData } from '../utilities/firebase.js';

const Main = ({}) => {
  var [postList, postListLoading, postListError] = useData(
    "/posts",
    getPostList
  );
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

function getPostList(posts) {
  var listOfPost = Object.entries(posts).map(([postId, postObj]) => {
    return { ...postObj, id: postId };
  });
  // listOfEvent = listOfEvent.sort((item1, item2) => {
  //   return item1.eventTime - item2.eventTime;
  // });
  return listOfPost;
}

export default Main;
