import { Box, Fab, Typography } from "@mui/material";
import logo from "../logo.svg";
import AddIcon from "@mui/icons-material/Add";
import { CSSProperties } from "react";

export default function ItemsScreen() {
  return (
    <Box sx={container}>
      <Typography variant="h4" gutterBottom>
        Artikli
      </Typography>
      <Box sx={contentContainer}></Box>
      <Fab
        style={{
          position: "fixed",
          bottom: "100px",
          right: "30px",
        }}
        color="primary"
        aria-label="add"
        onClick={() => alert("clicked!")}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
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
