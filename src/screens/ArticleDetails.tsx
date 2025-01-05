import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  FormControl,
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
import { commonStyles } from "../style";
import { ChangeEvent, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Article, ArticleShopPricing, Shop } from "../models/DbEntities";
import { apiService } from "../services/apiServiceFactory";
import ArticleShopPricingItem from "../components/ArticleDetails/ArticleShopPricingItem";

const ArticleDetails = () => {
  const [article, setArticle] = useState<Article>();
  const [pricings, setPricings] = useState<
    { pricing: ArticleShopPricing; isLowest: boolean }[]
  >([]);
  const [shops, setShops] = useState<Shop[]>();
  const [isLoading, setIsLoading] = useState(false);

  // New/Update pricing
  const [newPricingSelectedShop, setNewPricingSelectedShop] =
    useState<string>("Shop");
  const [newPricingPrice, setNewPricingPrice] = useState<number | "">("");
  const [isPricingForShopExists, setIsPricingForShopExists] =
    useState<boolean>(false);
  const [isFieldsDisabled, setIsFieldsDisabled] = useState<boolean>(true);

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  // Get article data
  useEffect(() => {
    const articleLocationData: Article = location.state || {};
    if (articleLocationData) {
      setArticle(articleLocationData);
    } else {
      const fetchArticleData = async () => {
        // console.log("Fetching article");
        setIsLoading(true);
        const result = await apiService.fetchArticleDetails(Number(id));
        setIsLoading(false);
        // console.log("Done fetching article");
        if (!result) {
          alert("Error fetching article details");
          return;
        }
        setArticle(result);
      };
      fetchArticleData();
    }
  }, []);

  // Get pricings
  useEffect(() => {
    const fetchPricings = async () => {
      // console.log("Fetching pricings");
      setIsLoading(true);
      const result = await apiService.fetchArticlePricings(Number(article?.id));
      setIsLoading(false);
      // console.log("Fetch pricings done");
      if (!result) {
        alert("Error fetching pricings");
        return;
      }
      let lowestIndex = 0;
      let lowestPrice = 9999;
      result.forEach((x, index) => {
        if (x.pricePerUnit < lowestPrice) {
          lowestIndex = index;
          lowestPrice = x.pricePerUnit;
        }
      });
      const pricingsWithLowestIndex = result.map((x, index) => ({
        pricing: x,
        isLowest: index === lowestIndex ? true : false,
      }));
      setPricings(pricingsWithLowestIndex);
    };
    fetchPricings();
  }, [article]);

  // Get shops
  useEffect(() => {
    const fetchShopsData = async () => {
      setIsLoading(true);
      const result = await apiService.fetchShops();
      setIsLoading(false);
      if (!result) {
        alert("Error fetching article details");
        return;
      }
      setShops(result);
      const defaultShop = result[0];
      setNewPricingSelectedShop(defaultShop.name);
      checkExistingPricingState(defaultShop.name);
      setIsFieldsDisabled(false);
    };
    fetchShopsData();
  }, [pricings]);

  const checkExistingPricingState = (selectedShopName: string) => {
    if (!pricings) {
      console.warn("No pricings loaded. can't check for existing shop.");
      setIsPricingForShopExists(false);
      return;
    }
    const existingIndex = pricings?.findIndex(
      (x) => x.pricing.shopName == selectedShopName
    );
    if (existingIndex !== -1) {
      setIsPricingForShopExists(true);
      return;
    }
    setIsPricingForShopExists(false);
  };

  const onUpdatePricing = async (isNew: boolean) => {
    setIsLoading(true);
    setIsFieldsDisabled(true);

    const selectedShop = shops?.find((x) => x.name === newPricingSelectedShop);
    if (article && selectedShop && newPricingPrice) {

      // Responsive client-side update
      if (isNew) {
        setPricings((prevState) => [
          ...prevState,
          {
            isLowest: false,
            pricing: {
              articleId: article?.id,
              pricePerUnit: Number(newPricingPrice),
              shopId: selectedShop.id,
              shopName: selectedShop.name,
              unitName: article.priceUnitName,
            },
          },
        ]);
      } else {
        const indexToChange = pricings.findIndex(
          (x) => x.pricing.shopId === selectedShop.id
        );
        setPricings((prevState) =>
          prevState.map((x, index) =>
            index === indexToChange
              ? {
                  isLowest: x.isLowest,
                  pricing: {
                    ...x.pricing,
                    pricePerUnit: Number(newPricingPrice),
                  },
                }
              : x
          )
        );
      }

      // Server-side update
      const response = await apiService.updateArticleShopPricing(
        selectedShop.id,
        newPricingPrice
      );
      if (!response) alert("Update failed! Please try again later.");
    }

    setIsLoading(false);
    setIsFieldsDisabled(false);
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
          {pricings &&
            pricings.map((p, index) => (
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
            {shops &&
              shops.map((shop, index) => (
                <MenuItem key={`shopId${index}`} value={shop.name}>
                  {shop.name}
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
            onClick={() => onUpdatePricing(false)}
          >
            Update existing
          </Button>
        )}
        {!isPricingForShopExists && (
          <Button
            disabled={isFieldsDisabled}
            variant="contained"
            size="large"
            endIcon={<AddCircleSharpIcon />}
            color="success"
            onClick={() => onUpdatePricing(true)}
          >
            Add new
          </Button>
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
