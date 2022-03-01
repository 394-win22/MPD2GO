import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, CardContent, Card, Box, Chip,Stack } from "@mui/material/";
import { makeStyles, useTheme } from "@mui/styles";
import { RichTextEditor } from '@mantine/rte';

import { UserContext } from "components/LoggedIn";

import { getUserDataFromUID } from "../../utilities/posts";
import AvatarWithTag from "components/AvatarWithTag/AvatarWithTag";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    "&:hover": {
      cursor: "pointer",
    },
    backgroundColor: theme.palette.foreground,
  },
  comment: {
    marginLeft: "10px",
    fontsize: "12px",
    color: "grey",
  },
}));

const Post = ({ post }) => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const theme = useTheme();
  const classes = useStyles(theme);
  const users = context.userList;
  const user = getUserDataFromUID(post.author, users);

  const getNumCommentsText = (post) => {
    if (!("numComments" in post)) return "0 Comments";
    const num = post.numComments;
    if (num === 0) return "0 Comments";
    else if (num === 1) return "1 Comment";
    else return `${num} Comments`;
  };
  return (
    <Card
      className={classes.card}
      sx={{ mb: 3 }}
      onClick={() => {
        navigate(`/post/${post.id}`);
      }}
    >
      <AvatarWithTag user={user} post={post} />

      <CardContent sx={{ pt: 0, px: 0 }}>
        <RichTextEditor readOnly value={post.description} style={{border: 'none', marginBottom: -15}}/>


        <Stack direction="row" spacing={1} sx={{mt:2,overflowX: "scroll", paddingLeft: 2}}>

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

      <Box sx={{ display: "flex", marginBottom: 2, mx: 2}}>
        <Typography className={classes.comment} variant="body2">
          {getNumCommentsText(post)}
        </Typography>
      </Box>
    </Card>
  );
};

export default Post;
