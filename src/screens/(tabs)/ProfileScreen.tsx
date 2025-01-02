import { Box, Button, Typography } from "@mui/material";
import { CSSProperties } from "react";

export default function ProfileScreen() {
  return (    <Box sx={container}>
    <Typography variant="h4" gutterBottom>
      Profil
    </Typography>
    <Box sx={contentContainer}>
    </Box>
  </Box>);
}

const container: CSSProperties = {
  flex: 1,
  display: "flex",
  justifyContent: "start",
  alignItems: "stretch",
  flexDirection: "column",
  height: "100%",
};

const contentContainer: CSSProperties = {
  display: "flex",
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};
