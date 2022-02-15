import * as React from "react";
import Card from "@mui/material/Card";
import { Avatar } from "@mui/material";
import { CardHeader } from "@mui/material";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";

export default function Comment() {
  return (
    <>
      <Box display="block">
        <Card
          sx={{ padding: 1 }}
          style={{ backgroundColor: "#cfd8dc", display: "inline-block" }}
        >
          <Box display="flex">
            <Avatar display="flex" sx={{ mr: 2 }}>
              ICON
            </Avatar>
            <Box>
              <Typography variant="subtitle2">@username</Typography>
              <Typography variant="body2">
                This looks like a great idea!{" "}
              </Typography>
            </Box>
            <Box></Box>
          </Box>
        </Card>
      </Box>
    </>
  );
}
