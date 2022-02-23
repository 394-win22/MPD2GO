import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Avatar,
  Box,
  Button
} from "@mui/material";
import moment from "moment";
import Chip from "@mui/material/Chip";
import ReactGoogleSlides from "react-google-slides";
import { getProjectFromUid } from "../../utilities/firebase";
import { getUserDataFromUID } from "../../utilities/posts"
import { UserContext } from "components/LoggedIn";
import driveLogo from 'google-drive.png'
import muralLogo from './../../mural.png'

const Project = () => {
  const navigate = useNavigate()
  const { projectId } = useParams();
  const [projectData, setProjectData] = useState(null);
  const context = useContext(UserContext);
  const users = context.userList;

  useEffect(() => {
    async function fetchData() {
      const data = await getProjectFromUid(projectId);
      if (!data) setProjectData("not found");
      else setProjectData(data);
    }
    fetchData();
  }, [projectId]);

  if (!projectData) {
    return <h1 style={{ marginLeft: 20 }}>Loading...</h1>;
  }
  return (
    <>
      <Button
        sx={{ ml: 1, mb: 2, color: 'white' }}
        variant='contained'
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </Button>
      <Card sx={{ mx: 1, mb: 10 }} style={{ borderRadius: 10 }}>
        <Box sx={{ my: 2 }} style={{ display: "block" }}>
          <Avatar
            sx={{ width: 100, height: "auto", mx: 2 }}
            style={{ float: "left" }}
            src={projectData.photoURL}
          ></Avatar>
          <CardHeader
            align="left"
            title={projectData.name}
            subheader={
              "Last Updated " +
              moment(projectData.lastUpdateTime).format("MMMM Do YYYY")
            }
            aria-label="avatar"
          />
        </Box>

        <CardContent>
          <Typography variant="h6" align="left">
            Team Members
          </Typography>
          <Typography variant="h6" align="left">
            {Object.values(projectData.member).map((member) => {
              const user = getUserDataFromUID(member, users);
              return (
                <Chip
                  avatar={<Avatar alt={user.displayName} src={user.photoURL} />}
                  label={user.displayName}
                  variant="outlined"
                  key={user.uid}
                  sx={{ mx: 1 }}
                  onClick={() => {
                    navigate(`/profile/${user.uid}`);
                  }}
                  clickable
                />)
            })}</Typography>
          <hr></hr>
          <Typography variant="h6" align="left" sx={{ my: 1 }}>
            Current Phase&emsp;
            <Chip
              label={projectData.phase}
              color="primary"
              variant="outlined"
              size="small"
            />
          </Typography>
          <Typography variant="h6" align="left" sx={{ my: 1 }}>
            Description
          </Typography>

          <Typography variant="body2">{projectData.description}</Typography>
          <Typography variant="h6" align="left" sx={{ my: 1 }}>
            Project Snapshot
          </Typography>
          <ReactGoogleSlides
            width={"100%"}
            height={480}
            slidesLink={projectData.slideURL}
            slideDuration={5}
            position={1}
            showControls
            loop
          />
          { (projectData.drive || projectData.mural) && 
          <>
            <Typography variant="h6" align="left" sx={{ my: 1 }}>
              Additional Resources
            </Typography>
            {projectData.drive &&
            <>
              <Button sx={{ marginLeft: '8px' }}
                startIcon={<CardMedia
                  component='img'
                  style={{width: 20, height: 20}}
                  image={driveLogo}
                  alt='drive'
                />}
                onClick={() => {
                  window.open(projectData.drive)
                }}
              >Project Folder</Button>
              </>}
            {projectData.mural &&
              <>
                <Button sx={{ marginLeft: '8px' }}
                  startIcon={<CardMedia
                    component='img'
                    style={{width: 20, height: 20}}
                    image={muralLogo}
                    alt='mural'
                  />}
                  onClick={() => {
                    window.open(projectData.mural)
                  }}
                >Project Mural</Button>
              </>}
            </>}
        </CardContent>
      </Card>
    </>
  );
};

export default Project;
