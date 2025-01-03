import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  IconButton,
  SxProps,
  Toolbar,
  Typography,
} from "@mui/material";
import BackIcon from "@mui/icons-material/ArrowBack";
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import { commonStyles } from "../style";
import { CSSProperties, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Article, ArticleShopPricing } from "../models/DbEntities";
import { apiService } from "../services/apiServiceFactory";
import ArticleShopPricingItem from "../components/ArticleDetails/ArticleShopPricingItem";

const ArticleDetails = () => {
  const [article, setArticle] = useState<Article>();
  const [pricings, setPricings] =
    useState<{ pricing: ArticleShopPricing; isLowest: boolean }[]>();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();
  const { id } = useParams();

  // Get article data
  useEffect(() => {
    console.log("Getting article data");
    const articleLocationData: Article = location.state || {};
    if (articleLocationData) {
      console.log("Setting from location data: ", articleLocationData);
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

  return (
    <Box>
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
            Banana
          </Typography>
          {isLoading && <CircularProgress />}
        </Toolbar>
      </AppBar>
      <Box sx={commonStyles.contentContainer}>
        {article && (
          <Box sx={articleContainer}>
            {/* <Typography>Article: {article.name}</Typography> */}
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
        <Button variant="contained" endIcon={<AddCircleSharpIcon />}>
          New Pricing
        </Button>
      </Box>
    </Box>
  );
};

export default ArticleDetails;

const articleContainer: SxProps = {
  display: "flex",
  alignItems: "start",
  flexDirection: "column",
  pb: "15px"
};

const pricingsContainer: SxProps = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  pb: "15px"
};
