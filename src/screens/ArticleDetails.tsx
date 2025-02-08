import {
  Alert,
  AppBar,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
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
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArticleStorePricing } from "../models/DbEntities";
import ArticleShopPricingItem from "../components/ArticleDetails/ArticleShopPricingItem";
import useFetchShoppingStores from "../hooks/useFetchShoppingStores";
import useFetchArticleDetails from "../hooks/useFetchArticleDetails";
import useFetchArticlePricings from "../hooks/useFetchArticlePricings";
import useUpdateArticlePricing from "../hooks/useUpdateArticlePricing";

const ArticleDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [pricingsWithInfo, setPricingsWithInfo] = useState<
    { pricing: ArticleStorePricing; isLowest: boolean }[]
  >([]);

  // Data fetching
  const { isLoading, article, error } = useFetchArticleDetails(Number(id));
  const {
    data: stores,
    error: errorStores,
    isLoading: isLoadingStores,
  } = useFetchShoppingStores();
  const {
    isLoading: isLoadingPricings,
    data: pricings,
    error: errorPricings,
  } = useFetchArticlePricings(Number(id));

  // New/Update pricing
  const {
    updateArticlePricing,
    isLoading: isLoadingUpdatePricing,
    showSuccess,
    showFailure,
    feedbackMessage,
    isFieldsDisabled,
    setIsFieldsDisabled,
  } = useUpdateArticlePricing();
  const [newPricingSelectedShop, setNewPricingSelectedShop] =
    useState<string>("Shop");
  const [newPricingPrice, setNewPricingPrice] = useState<number | "">("");
  const [isPricingForShopExists, setIsPricingForShopExists] =
    useState<boolean>(false);

  // Get pricings with rankInfo
  // TODO: Get ordered rank, not just best
  useEffect(() => {
    if (!pricings) return;
    let lowestIndex = 0;
    let lowestPrice = 9999;
    pricings.forEach((x, index) => {
      if (x.pricePerUnit < lowestPrice) {
        lowestIndex = index;
        lowestPrice = x.pricePerUnit;
      }
    });
    const pricingsWithLowestIndex = pricings.map((x, index) => ({
      pricing: x,
      isLowest: index === lowestIndex ? true : false,
    }));
    setPricingsWithInfo(pricingsWithLowestIndex);
  }, [pricings]);

  // Handle stores result
  useEffect(() => {
    if (isLoadingStores) return;
    if (errorStores) {
      console.error(errorStores);
      // alert("Error fetching stores: " + errorStores?.message);
      return;
    }
    if (!stores || stores.length === 0) {
      alert("No stores in database...");
      return;
    }

    const defaultStore = stores[0];
    setNewPricingSelectedShop(defaultStore.name);
    checkExistingPricingState(defaultStore.name);
    setIsFieldsDisabled(false);
  }, [stores, errorStores]);

  const checkExistingPricingState = (selectedShopName: string) => {
    if (!pricings) {
      setIsPricingForShopExists(false);
      return;
    }
    const existingIndex = pricingsWithInfo?.findIndex(
      (x) => x.pricing.shopName == selectedShopName
    );
    if (existingIndex !== -1) {
      setIsPricingForShopExists(true);
      return;
    }
    setIsPricingForShopExists(false);
  };

  const handleShopChange = (ev: SelectChangeEvent<string>) => {
    const selectedShop = ev.target.value as string;
    setNewPricingSelectedShop(selectedShop);
    checkExistingPricingState(selectedShop);
  };

  const handlePriceChange = (ev: ChangeEvent<HTMLInputElement>) => {
    if (ev.target.value === "") {
      setNewPricingPrice("");
      return;
    }
    const price = Number(ev.target.value);
    setNewPricingPrice(price);
  };

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
            {article?.name}
          </Typography>
          {isLoading && <CircularProgress />}
        </Toolbar>
      </AppBar>
      <Container sx={commonStyles.contentContainer}>
        {article && (
          <Box sx={articleContainer}>
            <Typography>Added by: {article.addedByUserName}</Typography>
            <Typography>Note: {article.note}</Typography>
          </Box>
        )}

        <Typography variant="h6">Pricings:</Typography>
        <Box sx={pricingsContainer}>
          {pricingsWithInfo &&
            pricingsWithInfo.map((p, index) => (
              <ArticleShopPricingItem
                key={index}
                data={p.pricing}
                isLowestPrice={p.isLowest}
              />
            ))}
        </Box>
      </Container>
      <Divider>New/Update Pricing</Divider>
      <Container sx={{ ...commonStyles.contentContainer, gap: "15px" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Shop</InputLabel>
          <Select
            disabled={isFieldsDisabled}
            labelId="demo-simple-select-label1"
            id="demo-simple-select1"
            value={newPricingSelectedShop}
            label="Shop"
            onChange={handleShopChange}
          >
            {stores &&
              stores.map((store, index) => (
                <MenuItem key={`shopId${index}`} value={store.name}>
                  {store.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <TextField
          disabled={isFieldsDisabled}
          label={"Price"}
          value={newPricingPrice}
          type="number"
          onChange={handlePriceChange}
        />

        {isPricingForShopExists && (
          <Button
            disabled={isFieldsDisabled}
            variant="contained"
            size="large"
            endIcon={<EditSharpIcon />}
            onClick={() => {
              const selectedShop = stores?.find(
                (x) => x.name === newPricingSelectedShop
              );
              updateArticlePricing(false, article, newPricingPrice, selectedShop);
            }}
          >
            Update pricing
          </Button>
        )}
        {!isPricingForShopExists && (
          <Button
            disabled={isFieldsDisabled}
            variant="contained"
            size="large"
            endIcon={<AddCircleSharpIcon />}
            color="success"
            onClick={() => {
              const selectedShop = stores?.find(
                (x) => x.name === newPricingSelectedShop
              );
              updateArticlePricing(true, article, newPricingPrice, selectedShop);
            }}
          >
            Add pricing for new shop
          </Button>
        )}
        {showSuccess && (
          <Grow in={showSuccess}>
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
              Changes saved.
            </Alert>
          </Grow>
        )}

        {showFailure && (
          <Grow in={showFailure}>
            <Alert severity="warning">{feedbackMessage}</Alert>
          </Grow>
        )}
      </Container>
    </Box>
  );
};

export default ArticleDetails;

const containerStyle: SxProps = {
  flex: 1,
};

const articleContainer: SxProps = {
  display: "flex",
  alignItems: "start",
  flexDirection: "column",
  pb: "15px",
};

const pricingsContainer: SxProps = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  pb: "15px",
};
