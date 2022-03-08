import { useState, useEffect, useContext, useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Box,
  Button,
  Chip,
} from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import moment from "moment";
import ReactGoogleSlides from "react-google-slides";
import { getProjectFromUid } from "../../utilities/firebase";
import { getUserDataFromUID } from "../../utilities/posts";
import { UserContext } from "components/Routing";
import EditProjectButton from "components/EditProject/EditProjectButton";
import DriveLogo from "resources/google-drive.png";
import MuralLogo from "resources/mural.png";
import { ContactPageOutlined } from "@mui/icons-material";

const Project = (user) => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [projectData, setProjectData] = useState(null);
  const context = useContext(UserContext);
  const users = context.userList;

  const [width, setWidth] = useState();
  const ref = useCallback((e) => {
      if (e) {
        setWidth(e.clientWidth)
      }
  });

  const otherRef = useRef();
  function handleWindowSizeChange() {
    setWidth(otherRef.current.clientWidth)
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
        window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

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
    <div ref={otherRef}>
      <div ref={ref}>
        <Button
          sx={{ mb: 2, color: "white" }}
          variant="contained"
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </Button>
        <Card sx={{ mb: 10 }} style={{ borderRadius: 10 }}>
          {Object.values(projectData.member).includes(user.user.uid) && (
            <EditProjectButton
              project={projectData}
              projectId={projectId}
              setProjectData={setProjectData}
            />
          )}
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
                    sx={{ mx: 1, verticalAlign: "middle" }}
                    onClick={() => {
                      navigate(`/profile/${user.uid}`);
                    }}
                    key={member}
                    clickable
                  />
                );
              })}
            </Typography>
            <hr />
            <Typography variant="h6" align="left" sx={{ my: 1 }}>
              Current Phase&emsp;
              <Chip
                label={projectData.phase}
                color="primary"
                variant="contained"
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
              height={parseInt(width*0.6)+"px"}
              slidesLink={projectData.slideURL}
              slideDuration={5}
              position={1}
              showControls
              loop
            />
            {projectData.resources !== undefined &&
              Object.values(projectData.resources).length > 0 && (
                <>
                  <Typography variant="h6" align="left" sx={{ my: 1 }}>
                    Additional Resources
                  </Typography>
                  {Object.values(projectData.resources).map((resource) => (
                    <>
                      <Button
                        sx={{ marginLeft: "8px" }}
                        startIcon={
                          resource.url.includes("mural") ? (
                            <img
                              src={MuralLogo}
                              alt=""
                              style={{ height: 20, width: 20 }}
                            />
                          ) : resource.url.includes("drive") ? (
                            <img
                              src={DriveLogo}
                              alt=""
                              style={{ height: "20px", width: "20px" }}
                            />
                          ) : (
                            <LinkIcon />
                          )
                        }
                        onClick={() => {
                          window.open(resource.url);
                        }}
                      >
                        {resource.text}
                      </Button>
                    </>
                  ))}
                </>
              )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Project;
