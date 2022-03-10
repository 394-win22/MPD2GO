import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  Typography,
  Avatar,
  Box,
  Divider,
  Button,
  Stack,
  Card,
  Chip,
  IconButton,
  CardHeader,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { getUserStatus } from "../../utilities/firebase";
// icons
import { Email as EmailIcon } from "@mui/icons-material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

// local files
import { getProjectFromUid, getUserFromUid } from "../../utilities/firebase";
import { signOut } from "utilities/firebase";
import BackButton from "../Navigation/BackButton";

const expertiseList = [
  "Marketing",
  "Industrial Design",
  "Mechanical Engineering",
  "Electrical Engineering",
  "Software Development",
  "Product Owner",
  "UI/UX Design",
  "Finance",
  "Graphic Design",
  "Project Management",
];

const EditProfile = ({ userData, user, setIsEditProfile, projectData }) => {
  const params = useParams();
  const navigate = useNavigate();

  const [isNameEditing, setIsNameEditing] = useState(false);
  const [isBioEditing, setIsBioEditing] = useState(false);
  const [isLocationEditing, setIsLocationEditing] = useState(false);
  const [isYearEditing, setIsYearEditing] = useState(false);
  const [isExpertiseEditing, setIsExpertiseEditing] = useState(false);
  const [isEmailEditing, setIsEmailEditing] = useState(false);
  const [isLinkedInEditing, setIsLinkedInEditing] = useState(false);

  const [formValues, setFormValues] = useState(user);
  const [expertise, setExpertise] = useState("");

  const handleTagChange = (event) => {
    const {
      target: { value },
    } = event;
    setExpertise(typeof value === "string" ? value.split(",") : value);
  };

  const handleProfileSubmit = () => {
    setIsEditProfile(false);
  };

  return (
    <>
      <CardHeader
        sx={{ p: 0 }}
        avatar={<BackButton />}
        action={
          <IconButton onClick={handleProfileSubmit}>
            <CheckIcon />
          </IconButton>
        }
      ></CardHeader>

      <Box
        component="form"
        sx={{ justifyContent: "center", textAlign: "center" }}
        noValidate
      >
        <Avatar
          alt={userData.displayName}
          src={userData.photoURL}
          variant="circular"
          sx={{
            height: "20vh",
            width: "20vh",
            margin: "auto",
            my: 1,
          }}
        />
        {isNameEditing ? (
          <Stack direction="row" sx={{ display: "block" }}>
            <IconButton onClick={() => setIsNameEditing(false)}>
              <CancelOutlinedIcon />
            </IconButton>
            <TextField
              required
              id="name"
              label="Name"
              defaultValue={userData.displayName}
            />
          </Stack>
        ) : (
          <Typography
            variant="h4"
            component="div"
            sx={{
              flexGrow: 1,
              paddingLeft: 1,
              paddingBottom: 1,
              marginBottom: "0px",
            }}
          >
            <IconButton onClick={() => setIsNameEditing(true)}>
              <EditIcon />
            </IconButton>
            {userData.displayName}
          </Typography>
        )}

        {isBioEditing ? (
          <Stack direction="row" sx={{ display: "block" }}>
            <IconButton onClick={() => setIsBioEditing(false)}>
              <CancelOutlinedIcon />
            </IconButton>
            <TextField
              id="bio"
              label="bio"
              defaultValue={userData.bio ? userData.bio : "No Bio"}
            />
          </Stack>
        ) : (
          <Typography
            component="div"
            sx={{ flexGrow: 1, paddingLeft: 1, color: "#7B7B7B" }}
          >
            <IconButton onClick={() => setIsBioEditing(true)}>
              <EditIcon />
            </IconButton>
            {userData.bio ? userData.bio : "No Bio"}
          </Typography>
        )}

        {isLocationEditing ? (
          <Stack direction="row" sx={{ display: "block" }}>
            <IconButton onClick={() => setIsLocationEditing(false)}>
              <CancelOutlinedIcon />
            </IconButton>
            <TextField
              id="location"
              label="Location"
              defaultValue={userData.location ? userData.location : "Unknown Location"}
            />
          </Stack>
        ) : (
          <Typography
            variant="body1"
            display="block"
            sx={{ my: 1 }}
            style={{ color: "#7B7B7B" }}
          >
            <IconButton onClick={() => setIsLocationEditing(true)}>
              <EditIcon />
            </IconButton>
            {userData.location ? userData.location : "Unknown Location"}
          </Typography>
        )}

        <Divider />
        <Typography
          variant="body1"
          style={{ color: "#7B7B7B" }}
          sx={{ paddingLeft: 1, my: 1 }}
        >
          {getUserStatus(userData)}
        </Typography>

        {isYearEditing ? (
          <Stack direction="row" sx={{ display: "block" }}>
            <IconButton onClick={() => setIsYearEditing(false)}>
              <CancelOutlinedIcon />
            </IconButton>
            <TextField
              id="year"
              label="Year"
              defaultValue={userData.year ? "Class of " + userData.year : "No Year"}
            />
          </Stack>
        ) : (
          <Typography
            variant="body1"
            display="block"
            style={{ color: "#7B7B7B" }}
            sx={{ flexGrow: 1, paddingLeft: 1 }}
          >
            <IconButton onClick={() => setIsYearEditing(true)}>
              <EditIcon />
            </IconButton>
            {userData.year ? "Class of " + userData.year : "No Year"}
          </Typography>
        )}

        {"teamId" in userData && (
          <Button
            variant="contained"
            onClick={() => {
              navigate(`/project/${userData.teamId}`);
            }}
            sx={{
              mt: 1,
              mb: 2,
              backgroundColor: projectData.teamColor,
              color: projectData.textColor,
              textBlendMode: "exclusion",
            }}
          >
            View {projectData.name}
          </Button>
        )}

        <Divider />

        {isExpertiseEditing ? (
          <Stack direction="row" sx={{ display: "block" }}>
            <IconButton onClick={() => setIsExpertiseEditing(false)}>
              <CancelOutlinedIcon />
            </IconButton>
            <FormControl sx={{ m: 1, width: "25ch" }}>
              <InputLabel id="expertise">Expertise</InputLabel>
              <Select
                labelId="expertise"
                name="Expertise"
                value={expertise || formValues.expertise || []}
                label="expertise"
                onChange={handleTagChange}
                multiple
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {expertiseList.map((expert) => (
                  <MenuItem key={expert} value={expert}>
                    {expert}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        ) : (
          <>
            <Typography
              align="left"
              sx={{ marginBottom: 3, ml: 2, mt: 1, color: "#7B7B7B" }}
            >
              <IconButton onClick={() => setIsExpertiseEditing(true)}>
                <EditIcon />
              </IconButton>
              Expertise
            </Typography>
            <Stack
              direction="row"
              sx={{ marginBottom: 3, ml: 2, overflowX: "scroll" }}
              spacing={1}
            >
              {"expertise" in userData &&
                Object.values(userData.expertise).map((x, i) => (
                  <Chip key={i} color="secondary" label={x} />
                ))}
            </Stack>
          </>
        )}

        <Divider />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            {isEmailEditing ? (
              <Stack direction="row" sx={{ display: "block", my: 2 }}>
                <IconButton onClick={() => setIsEmailEditing(false)}>
                  <CancelOutlinedIcon />
                </IconButton>

                <TextField id="email" label="Email" defaultValue={userData.email} />
              </Stack>
            ) : (
              <Stack direction="row" sx={{ marginBottom: 3, marginTop: 2 }} spacing={1}>
                <IconButton onClick={() => setIsEmailEditing(true)} sx={{ p: 0 }}>
                  <EditIcon />
                </IconButton>
                <EmailIcon sx={{ color: "#999999" }} />
                <Typography>{userData.email}</Typography>
              </Stack>
            )}

            {isLinkedInEditing ? (
              <Stack direction="row" sx={{ display: "block", my: 2 }}>
                <IconButton onClick={() => setIsLinkedInEditing(false)}>
                  <CancelOutlinedIcon />
                </IconButton>

                <TextField
                  id="linkedIn"
                  label="LinkedIn"
                  defaultValue={userData.linkedIn ? userData.linkedIn : "No LinkedIn"}
                />
              </Stack>
            ) : (
              <Stack direction="row" sx={{ marginBottom: 3 }} spacing={1}>
                <IconButton onClick={() => setIsLinkedInEditing(true)} sx={{ p: 0 }}>
                  <EditIcon />
                </IconButton>
                <LinkedInIcon sx={{ color: "#4173ac" }} />
                <Typography>
                  {userData.linkedIn ? userData.linkedIn : "No LinkedIn"}
                </Typography>
              </Stack>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default EditProfile;
