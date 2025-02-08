import {
  Alert,
  AppBar,
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grow,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SxProps,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import BackIcon from "@mui/icons-material/ArrowBack";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import CheckIcon from "@mui/icons-material/Check";
import { commonStyles } from "../style";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PriceUnit } from "../models/DbEntities";
import useFetchPriceUnits from "../hooks/useFetchPriceUnits";
import useCreateArticle from "../hooks/useCreateArticle";

const ArticleCreate = () => {
  const navigate = useNavigate();
  // State
  const [name, setName] = useState<string>("");
  const [selectedUnit, setSelectedUnit] = useState<PriceUnit | undefined>();
  const [note, setNote] = useState<string>("");
  // States for unit fetching
  const [showFailureUnitFetch, setShowFailureUnitFetch] =
    useState<boolean>(false);
  const [feedbackMessageUnitFetch, setFeedbackMessageUnitFetch] =
    useState<string>("");
  // Query hooks
  const priceUnits = useFetchPriceUnits();
  const { createArticle, isLoading, showFailure, showSuccess, error } =
    useCreateArticle();

  // Example. setting your state variables based on hook results
  // Note. creating article entirely simply exposes all its states and we use those instead of setting states in this component
  useEffect(() => {
    if (!priceUnits) return;
    if (priceUnits.error) {
      setFeedbackMessageUnitFetch(priceUnits.error.message);
      setShowFailureUnitFetch(true);
      return;
    }
    if (priceUnits.data) setSelectedUnit(priceUnits.data[0]);
  }, [priceUnits.data]); // Note. It's important to not have the dependancy of the whole object.

  //#region Methods
  const handleUnitChange = (ev: SelectChangeEvent<string>) => {
    const selectedUnitName = ev.target.value as string;
    const newSelectedUnit = priceUnits?.data?.find(
      (x) => x.unitName === selectedUnitName
    );
    console.log(
      "Unit change: ",
      selectedUnit?.shortName,
      newSelectedUnit?.shortName
    );
    setSelectedUnit(newSelectedUnit);
  };
  //#endregion

  // Computed
  const showLoading = isLoading || priceUnits.isLoading;

  console.log("Selected unit: ", selectedUnit?.unitName);

  return (
    <Box sx={containerStyle}>
      <AppBar position="static" color="transparent" style={{ padding: -20 }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate("/items")}
          >
            <BackIcon sx={{ mr: 2 }} />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {"New Article"}
          </Typography>
          {showLoading && <CircularProgress />}
        </Toolbar>
      </AppBar>
      <Container sx={{ ...commonStyles.contentContainer, gap: "15px" }}>
        <TextField
          label={"Name"}
          value={name}
          type="text"
          onChange={(ev) => setName(ev.target.value)}
        />
        <FormControl fullWidth>
          <InputLabel id="unitLabel">Price Unit</InputLabel>
          <Select
            labelId="unitLabel"
            id="unitSelect"
            value={selectedUnit ? selectedUnit.unitName : ""}
            label="Unit"
            onChange={handleUnitChange}
          >
            {priceUnits &&
              priceUnits.data &&
              priceUnits.data.map((unit, index) => (
                <MenuItem key={`unitId${index}`} value={unit.unitName}>
                  {`${unit.unitName} (${unit.shortName})`}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <TextField
          label={"Note"}
          value={note}
          type="text"
          multiline
          onChange={(ev) => setNote(ev.target.value)}
        />

        <Button
          disabled={isLoading}
          variant="contained"
          size="large"
          endIcon={<EditSharpIcon />}
          onClick={() => createArticle(name, selectedUnit?.id, note)}
        >
          Add new
        </Button>
        {showSuccess && (
          <Grow in={showSuccess}>
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
              Changes saved.
            </Alert>
          </Grow>
        )}

        {showFailureUnitFetch && (
          <Grow in={showFailureUnitFetch}>
            <Alert severity="warning">{feedbackMessageUnitFetch}</Alert>
          </Grow>
        )}
        {showFailure && (
          <Grow in={showFailure}>
            <Alert severity="warning">{error?.message}</Alert>
          </Grow>
        )}
      </Container>
    </Box>
  );
};

export default ArticleCreate;

const containerStyle: SxProps = {
  flex: 1,
};