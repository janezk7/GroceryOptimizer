import { Box, Button, Typography } from "@mui/material";
import { CSSProperties } from "react";
import { commonStyles } from "../../style";

export default function ProfileScreen() {
  return (
    <Box sx={commonStyles.contentContainer}>
      <Typography variant="h4" gutterBottom>
        Profil
      </Typography>
      <Box sx={contentContainer}></Box>
    </Box>
  );
}

const contentContainer: CSSProperties = {
  display: "flex",
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};
