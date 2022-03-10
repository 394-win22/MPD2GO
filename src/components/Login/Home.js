import { useState } from "react";
import { Grid, Box, Paper, Typography, Button, Link } from "@mui/material";
import { Route, Routes, Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { CssBaseline } from "@mui/material";

import logo from "resources/logo.png";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

const useStyles = makeStyles({
	leftImg: {
		backgroundImage:
			"url(https://ideas.ted.com/wp-content/uploads/sites/3/2018/11/featured_art_loosetouch_yifan_wu.jpg)",
		backgroundRepeat: "no-repeat",
		backgroundSize: "cover",
		backgroundPosition: "center",
	},
	rightPanel: {
		margin: "55px 32px",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		position: "relative"
	},
});

const Home = () => {
	const classes = useStyles();
	const [isSignUp, setIsSignUp] = useState(false);



	return (
		<Grid container component="main" sx={{ height: "100vh" }}>
			<CssBaseline />
			<Grid item xs={false} sm={4} md={7} className={classes.leftImg} />
			<Grid
				backgroundColor="#f1b844"
				item
				xs={12}
				sm={8}
				md={5}
				component={Paper}
				elevation={6}
				square
			>
				<Box className={classes.rightPanel}>
					<img src={logo} alt="Hive Logo" style={{ height: "10em" }} />
					{!isSignUp ? <LogIn /> : <SignUp />}

					<Link
						variant="body2"
						sx={{ color: "white", textDecoration: "none" }}
						onClick={() => setIsSignUp(!isSignUp)}
					>
						{(isSignUp) ?
							<Typography sx={{ textDecoration: "none" }} color="rgb(240, 242, 245)">
								Already have an account? <strong>Sign In</strong>
							</Typography> :
							<Typography sx={{ textDecoration: "none", mt: 1 }} color="rgb(240, 242, 245)">
								Don't have an account? <strong>Sign Up</strong>
							</Typography>
						}
					</Link>

				</Box>
			</Grid>
			<Button variant="contained"
				component={RouterLink}
				to="/tutorial"
				disableElevation
				sx={{
					borderRadius: "20px",
					backgroundColor: "#f1d07a",
					color: "#ffffff",
					display: "flex",
					flexDirection: "column",
					position: "absolute",
					bottom: "15px",
					left: "50%",
					transform: "translate(-50%, -50%)",
					px: 4,
					py: 2,
					"&:hover": {
						backgroundColor: "#e7c771"
					}

				}}
			>
				<Typography sx={{ display: "inline-block", whiteSpace: "nowrap" }}>
					Welcome 👋 🐝
				</Typography>
				<Typography sx={{ display: "inline-block", whiteSpace: "nowrap" }}>
					Take a tour of the Hive
				</Typography>
			</Button>
		</Grid>
	);
};

export default Home;
