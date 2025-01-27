import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grow,
  TextField,
  Typography,
} from "@mui/material";
import LoginSharpIcon from "@mui/icons-material/LoginSharp";
import { CSSProperties, useState } from "react";
import { commonStyles } from "../../style";
import useAuthStore from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";

export default function LoginScreen() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const login = useOnLoginHandle();

  return (
    <Box sx={commonStyles.contentContainer}>
      <Box sx={contentContainer}>
        <Typography variant="h4" gutterBottom>
          Login 🍌
        </Typography>
        <TextField
          label={"Username"}
          value={username}
          type="text"
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <TextField
          label={"Password"}
          value={password}
          type="password"
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <Button
          disabled={login.isLoading}
          variant="contained"
          size="large"
          endIcon={<LoginSharpIcon />}
          onClick={() => login.onLogin(username, password)}
        >
          Login
        </Button>
        {login.isLoading && <CircularProgress />}
        {login.showFailure && (
          <Grow in={login.showFailure}>
            <Alert severity="warning">{login.error?.message}</Alert>
          </Grow>
        )}
      </Box>
    </Box>
  );
}

const useOnLoginHandle = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showFailure, setShowFailure] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const onLogin = async (username: string, password: string) => {
    setShowFailure(false);
    setIsLoading(true);
    try {
      await login(username, password);
      navigate("/items");
    } catch (error) {
      setShowFailure(true);
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return { onLogin, isLoading, showFailure, error };
};

const contentContainer: CSSProperties = {
  display: "flex",
  flex: 1,
  justifyContent: "center",
  alignItems: "stretch",
  flexDirection: "column",
  gap: "8px",
};
