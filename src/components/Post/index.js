import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Typography, Card, Button, CardContent, Box, Chip } from "@mui/material";
import RichTextEditor from "@mantine/rte";

import Thread from "./Thread";
import { UserContext } from "components/LoggedIn";
import ReplyTextField from "./ReplyTextField";
import { DeletePostButton } from "./DeletePostButton";
import AvatarWithTag from "components/AvatarWithTag/AvatarWithTag";


const PostWithThreads = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { pageId } = useParams();
  const [post, setPost] = useState({});
  const [postAuthor, setPostAuthor] = useState({});
  const user = context.user;
  const userList = context.userList;
  const postList = context.postList;

  useEffect(() => {
    const post = postList.find((obj) => obj.id === pageId);
    if (!post) {
      navigate("/404");
    } else {
      setPost(post);
      const postAuthor = userList.find((obj) => obj.uid === post.author);
      setPostAuthor(postAuthor);
    }
  }, [pageId, postList, userList]);
  let sortedThreads = [];
  const haveChild = "threads" in post && Object.values(post.threads).length > 0;

  if (haveChild) sortedThreads = Object.entries(post.threads).sort().reverse();

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          sx={{ ml: 1, mb: 2, color: "white" }}
          variant="contained"
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </Button>
        {post.author == user.uid && <DeletePostButton key={post} post={post} />}
      </Box>
      <Card sx={{ mx: 1, mb: 10 }}>
        <AvatarWithTag user={postAuthor} post={post} />

        <CardContent sx={{ px: 0, pt: 0 }}>

          <RichTextEditor readOnly value={post.description} />

          {"tags" in post &&
            post.tags.map((tag, i) => (
              <Chip
                sx={{ mt: 1, mb: 0 }}
                label={tag}
                key={i}
                color="primary"
                variant="outlined"
                size="small"
              />
            ))}
        </CardContent>

        <ReplyTextField post={post} user={user} />

        <CardContent sx={{ paddingLeft: "2%" }} align="left">
          {"threads" in post &&
            Object.values(post.threads).length > 0 &&
            sortedThreads.map(([id, thread], i) => {
              return (
                <Thread key={i} postId={post.id} data={thread} ids={[id]} />
              );
            })}
        </CardContent>
      </Card>
    </>
  );
};

export default PostWithThreads;
