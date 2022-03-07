import {
	Container
} from "@mui/material";

import LoadingLogo from 'resources/loadingLogo.png'


const Loading = () => {
	return (
		<Container sx={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center" }}>
			<img alt="loading" src={LoadingLogo} width="80px"></img>
		</Container>
	);
};

export default Loading;
