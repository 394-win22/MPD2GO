import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RichTextEditor from "@mantine/rte";
import { Card, Button, CardContent, Box, Chip, Stack } from "@mui/material";
import BackButton from "../Navigation/BackButton"

import Thread from "./Thread";
import { UserContext } from "components/Routing";
import ReplyTextField from "./ReplyTextField";
import { DeletePostButton } from "./DeletePostButton";
import { EditPostButton } from "./EditPostButton";
import AvatarWithTag from "components/AvatarWithTag/AvatarWithTag";
import { updateData } from "utilities/firebase";

const PostWithThreads = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { pageId } = useParams();
  const [post, setPost] = useState({});
  const [postAuthor, setPostAuthor] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [postContent, setPostContent] = useState(post.description);

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
      setPostContent(post.description);
    }
  }, [navigate, pageId, postList, userList]);
  let sortedThreads = [];
  const haveChild = "threads" in post && Object.values(post.threads).length > 0;

  if (haveChild) sortedThreads = Object.entries(post.threads).sort().reverse();

  const handleSubmit = () => {
    updateData(`/posts/${post.id}`, { description: postContent });
    setIsEdit(false);
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        {post.author === user.uid && (
          <EditPostButton
            key={post}
            post={post}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
          />
        )}
        {post.author === user.uid && (
          <DeletePostButton key={post} post={post} />
        )}
      </Box>
      <Card sx={{ mb: 10 }}>
        <BackButton/>
        <AvatarWithTag user={postAuthor} post={post} />

        <CardContent sx={{ px: 0, pt: 0 }}>
          {isEdit ? (
            <>
              <RichTextEditor value={postContent} onChange={setPostContent} />
              <Box alignItems="right">
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  color="secondary"
                  sx={{
                    color: "white",
                    mt: 1,
                  }}
                >
                  Submit
                </Button>
              </Box>
            </>
          ) : (
            <RichTextEditor
              readOnly
              value={postContent}
              style={{ border: "none" }}
            />
          )}

          <Stack
            direction="row"
            spacing={1}
            sx={{ mt: 2, overflowX: "scroll", paddingLeft: 2 }}
          >
            {"tags" in post &&
              post.tags.map((tag, i) => (
                <Chip
                  label={tag}
                  key={i}
                  color="primary"
                  variant="outlined"
                  size="small"
                />
              ))}
          </Stack>
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
