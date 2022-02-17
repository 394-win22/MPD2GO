import * as React from "react";
import Card from "@mui/material/Card";
import { Avatar } from "@mui/material";
import { CardHeader } from "@mui/material";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";

export default function Comment(props) {
	/*

	{author: ,
	comment,
	threads:
	time:
	}

	*/

	console.log(props)

  return (
    <>
      <Box display="block" sx={{mt:1}}>
        <Card
          sx={{ padding: 1 }}
          style={{ backgroundColor: "#cfd8dc", display: "inline-block" }}
        >
          <Box display="flex">
            <Avatar display="flex" sx={{ mr: 2 }}>
              P
            </Avatar>
            <Box>
              <Typography variant="subtitle2">{props.author}</Typography>
              <Typography variant="body2">
								{props.comment}
              </Typography>
            </Box>
          </Box>
        </Card>
      </Box>
    </>
  );
}
