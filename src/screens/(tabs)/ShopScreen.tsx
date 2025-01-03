import { Box, Button, Typography } from "@mui/material";
import { CSSProperties } from "react";
import { commonStyles } from "../../style";

export default function ShopScreen() {
  return (
    <Box sx={commonStyles.contentContainer}>
      <Typography variant="h4" gutterBottom>
        Céh
      </Typography>
    </Box>
  );
}