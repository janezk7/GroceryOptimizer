import { Box, Button, Typography } from "@mui/material";
import { CSSProperties } from "react";
import { commonStyles } from "../../style";
import useAuthStore from "../../store/useAuthStore";

export default function ProfileScreen() {
  const logout = useAuthStore((state) => state.logout);
  const loggedUser = useAuthStore((state) => state.loggedUser);
  return (
    <Box sx={commonStyles.contentContainer}>
      <Typography variant="h4" gutterBottom>
        Profil
      </Typography>
      <Typography variant="subtitle1">{`Logged in as [${loggedUser}]`}</Typography>
      <Button variant="outlined" onClick={logout}>
        Logout
      </Button>
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
