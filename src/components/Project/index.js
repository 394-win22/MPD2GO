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
  Box,
} from "@mui/material";
import moment from "moment";
import { UserContext } from "components/LoggedIn";
import ReactGoogleSlides from "react-google-slides";
import{getProjectFromUid}from "../../utilities/firebase"
const Project = () => {
  const { projectId } = useParams();
  const [projectData, setProjectData] = useState(null);

  useEffect(async () => {
    const data = await getProjectFromUid(projectId)

    if (!data) setProjectData("not found")
    else setProjectData(data)
  }, [])

  return (
    <>
      <Card sx={{ mx: 1, mb: 10 }} style={{ borderRadius: 10 }}>
        <Box sx={{ my: 2 }} style={{ display: "block" }}>
          <Avatar
            sx={{ width: 100, height: "auto", mx: 2 }}
            style={{ float: "left" }}
            src="https://p.kindpng.com/picc/s/128-1289659_green-circle-png-page-green-bubbles-speech-png.png"
          ></Avatar>
          <CardHeader
            align="left"
            title="Green Team"
            subheader="Last Updated"
            aria-label="avatar"
          />
        </Box>

        <CardContent>
          <Typography variant="h6" align="left">
            Team Members
          </Typography>
          <Typography variant="h6" align="left">
            Current Phase
          </Typography>
          <Typography> Product Ideation</Typography>
          <Typography variant="h6" align="left">
            Description
          </Typography>

          <Typography variant="body2">
            Our team is exploring ways to create a home lighting system that
            adapts to the different lighting needs during different activities
            throughout the day.
          </Typography>
          <Typography variant="h6" align="left">
            Project Snapshot
          </Typography>
          <ReactGoogleSlides
            width={"100%"}
            height={480}
            slidesLink={
              "https://docs.google.com/presentation/d/1_yL24szhWnvjrKfW9bAv9tDJNzhKnr9gtAdC62s2V0E/edit?usp=sharing"
            }
            slideDuration={5}
            position={1}
            showControls
            loop
          />
        </CardContent>
      </Card>
    </>
  );
};

export default Project;
