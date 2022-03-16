import { useState } from "react";
import { IconButton, Button } from "@mui/material";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import First from "resources/tutorial/1.png";
import Second from "resources/tutorial/2.png";
import Third from "resources/tutorial/3.png";
import Fourth from "resources/tutorial/4.png";
import Fifth from "resources/tutorial/5.png";
import Sixth from "resources/tutorial/6.png";
import Seventh from "resources/tutorial/7.png";
import Eighth from "resources/tutorial/8.png";

import { useNavigate } from "react-router-dom";

import CloseIcon from "@mui/icons-material/Close";

const slideImages = [
	{
		img: First,
	},
	{
		img: Second,
	},
	{
		img: Third,
	},
	{
		img: Fourth,
	},
	{
		img: Fifth,
	},
	{
		img: Sixth,
	},
	{
		img: Seventh,
	},
	{
		img: Eighth,
	},
];

const Tutorial = () => {
	// const classes = useStyles();
	const [index, setIndex] = useState(0);
	const navigate = useNavigate();

	const properties = {
		duration: 2000,
		autoplay: false,
		transitionDuration: 300,
		arrows: true,
		infinite: false,
		canSwipe: true,
		// indicators: (i) => {
		// 	return (
		// 		<div className={(i === index) ? classes.indicatorActive : classes.indicator}>{i + 1}</div>
		// 	)
		// },
		onChange: (oldIndex, newIndex) => {
			setIndex(newIndex);
		}
	};

	function handleClose() {
		navigate(-1);
	}

	return (
		<>
			<div className="slide-container" style={{
				height: "100vh", width: "100vw",
				verticalAlign: "middle"
			}}>
				<Slide style={{
					height: "100%", width: "100%",
				}} {...properties}>
					{slideImages.map((slideImage, index) => (
						<img key={index} alt={slideImage.caption} src={slideImage.img}
							style={{ height: "auto", width: "100%" }}></img>
					))}
				</Slide>
			</div>


			{/* {(index === 0) && <Box sx={{
				position: "fixed", bottom: "40px",
				height: "20px", width: "60%",
				display: "flex",
				flexDirection: "row",
				alignItems: "center", justifyContent: "center",
				left: "50%",
				overflow: "hidden",
				transform: "translate(-50%, -50%)",
				color: "#e1e1e1", fontSize: "12px"
			}}>
				Swipe to explore app features
			</Box>} */}

			{(index === slideImages.length - 1) && <Button sx={{
				position: "fixed", bottom: "50px",
				display: "flex",
				flexDirection: "row",
				alignItems: "center", justifyContent: "center",
				left: "50%",
				overflow: "hidden",
				transform: "translate(-50%, -50%)",
				color: "white", fontSize: "14px"
			}} variant="contained" onClick={handleClose}>
				Go to app
			</Button>}

			{/* <Stack sx={{
				position: "fixed", bottom: "10px",
				height: "20px", width: "60%",
				display: "flex",
				flexDirection: "row",
				alignItems: "center", justifyContent: "center",
				left: "50%",
				overflow: "hidden",
				transform: "translate(-50%, -50%)",
			}} spacing={1} direction="row">
				{slideImages.map((item, i) => {
					if (i === index) return (<Box sx={{ backgroundColor: "#ffd000", height: "7px", width: "7px", borderRadius: "50%" }}></Box>);
					return (<Box sx={{ backgroundColor: "#c5c5c5", height: "7px", width: "7px", borderRadius: "50%" }}></Box>);
				})}
			</Stack> */}

			<IconButton sx={{
				position: "fixed",
				top: "24px",
				height: "40px",
				width: "40px",
				right: "-10px",
				transform: "translate(-50%, -50%)",
			}}
				onClick={handleClose}>
				<CloseIcon sx={{ color: "#a8a8a8", width: "25px", height: "25px" }}>
				</CloseIcon>
			</IconButton>

		</>

	)
};

export default Tutorial;
