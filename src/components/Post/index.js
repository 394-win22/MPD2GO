import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Typography,
  IconButton,
  Card,
  Button,
  CardHeader,
  CardContent,
  Avatar,
  Stack,
} from "@mui/material";
import moment from "moment";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import Chip from "@mui/material/Chip";
import Thread from "./Thread";
import { UserContext } from "components/LoggedIn";
import ReplyTextField from "./ReplyTextField";
import { DeletePostButton } from "./DeletePostButton";
import Box from "@mui/material/Box";

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
        {post.author == user.uid &&
          <DeletePostButton key={post} post={post} />}
      </Box>
      <Card sx={{ mx: 1, mb: 10 }}>
        <CardHeader
          align="left"
          avatar={
            <IconButton
              onClick={() => {
                navigate(`/profile/${postAuthor.uid}`);
              }}
              aria-label="menu"
            >
              <Avatar src={postAuthor.photoURL} aria-label="avatar" />
            </IconButton>
          }
          title={
            <Stack direction="row">
              <Typography>{postAuthor.displayName}</Typography>
              {"teamId" in user && (
                <Chip
                  icon={<InsertDriveFileIcon />}
                  size="small"
                  label="Capstone Page"
                  variant="outlined"
                  sx={{ mx: 1 }}
                  onClick={(event) => {
                    event.stopPropagation();
                    navigate(`/project/${user.teamId}`);
                  }}
                />
              )}
            </Stack>
          }
          subheader={moment(post.time).format("MMMM Do YYYY, h:mm a")}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary" align="left">
            {post.description}
          </Typography>
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
