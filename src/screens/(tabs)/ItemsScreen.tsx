import { Box, CircularProgress, Fab, Typography } from "@mui/material";
import logo from "../logo.svg";
import AddIcon from "@mui/icons-material/Add";
import { CSSProperties, useEffect, useState } from "react";
import { Article } from "../../models/DbEntities";
import { apiService } from "../../services/apiServiceFactory";
import ArticleCard from "../../components/ArticleCard";
import { commonStyles } from "../../style";

export default function ItemsScreen() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Getting articles...");
    const getArticles = async () => {
      try {
        setIsLoading(true);
        const data = await apiService.fetchArticles();
        setArticles(data);
        setIsLoading(false);
        console.log("Got data!", data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message); // Set error message
        } else {
          setError("An unexpected error occurred"); // Fallback for unknown errors
        }
      }
    };

    getArticles();
  }, []);

  return (
    <Box sx={commonStyles.contentContainer}>
      <Typography variant="h4" gutterBottom>
        Artikli
      </Typography>
      {isLoading && (
        <Box sx={loadingContainer}>
          <CircularProgress />
        </Box>
      )}
      <Box sx={itemsContainer}>
        {articles &&
          articles.map((a, index) => <ArticleCard key={index} data={a} />)}
      </Box>
      <Fab
        style={fabStyle}
        color="primary"
        aria-label="add"
        onClick={() => alert("Clicked")}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}

const fabStyle: CSSProperties = {
  position: "fixed",
  bottom: "80px",
  right: "30px",
};

const loadingContainer: CSSProperties = {
  display: "flex",
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
};

const itemsContainer: CSSProperties = {
  display: "flex",
  flex: 1,
  justifyContent: "flex-start",
  alignItems: "flex-start",
  alignContent: "flex-start",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: 1,
  // backgroundColor: 'cyan'
};
