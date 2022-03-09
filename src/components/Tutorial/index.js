import { useState } from "react";
import {
	Card,
	CardHeader,
	List,
	Box,
	Divider,
} from "@mui/material";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import First from 'resources/tutorial/1.png';
import Second from 'resources/tutorial/2.png';
import Third from 'resources/tutorial/3.png';

import { makeStyles } from "@mui/styles";


const slideImages = [
	{
		img: First,
		caption: 'Slide 1'
	},
	{
		img: Second,
		caption: 'Slide 2'
	},
	{
		img: Third,
		caption: 'Slide 3'
	},
];

const useStyles = makeStyles({
	indicatorContainer: {},
	indicator: {
		width: "30px",
		color: "blue",
		textAlign: "center",
		cursor: "pointer",
		border: "1px blue solid",
	},
	indicatorActive: {
		width: "30px",
		textAlign: "center",
		cursor: "pointer",
		border: "1px blue solid",

		backgroundColor: "#000",
		color: "#fff",

	}
});


const Tutorial = () => {
	const classes = useStyles();
	const [index, setIndex] = useState(0);

	const properties = {
		duration: 2000,
		autoplay: false,
		transitionDuration: 300,
		arrows: false,
		infinite: false,
		canSwipe: true,
		// indicators: (i) => {
		// 	return (
		// 		<div className={(i === index) ? classes.indicatorActive : classes.indicator}>{i + 1}</div>
		// 	)
		// },
		onChange: (oldIndex, newIndex) => {
			console.log(oldIndex, newIndex);
			setIndex(newIndex);
		}
	};

	return (
		<div className="slide-container" style={{
			height: "100vh", width: "100vw", position: "relative",
			backgroundColor: "purple", verticalAlign: "middle"
		}}>
			<Slide style={{
				height: "100%", width: "100%",
			}} {...properties}>
				{slideImages.map((slideImage, index) => (
					<img key={index} alt={slideImage.caption} src={slideImage.img}
						style={{ height: "auto", width: "100%" }}></img>
				))}
			</Slide>
			{/* <Box sx={{
				position: "absolute", bottom: "10px",
				height: "20px", width: "100px",
				backgroundColor: "red",
				left: "50%",
				transform: "translate(-50%, -50%)",
			}}>HELLO</Box> */}
		</div>

	)
};

export default Tutorial;
