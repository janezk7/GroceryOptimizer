import { Box, Fab, Typography } from "@mui/material";
import logo from "../logo.svg";
import AddIcon from "@mui/icons-material/Add";
import { CSSProperties, useEffect, useState } from "react";
import { Article } from "../../models/DbEntities";
import { apiService } from "../../services/apiServiceFactory";
import ArticleCard from "../../components/ArticleCard";

export default function ItemsScreen() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Getting articles...");
    const getArticles = async () => {
      try {
        const data = await apiService.fetchArticles();
        setArticles(data);
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
    <Box sx={customContainer}>
      <Typography variant="h4" gutterBottom>
        Artikli
      </Typography>
      <Box sx={itemsContainer}>
        {articles && articles.map((a) => <ArticleCard data={a} />)}
      </Box>
      {/* <div className="items-container">
        {articles && articles.map((a) => <ArticleCard data={a} />)}
      </div> */}
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

const customContainer: CSSProperties = {
  display: "flex",
  flex: 1,
  justifyContent: "start",
  alignItems: "stretch",
  flexDirection: "column",
  // backgroundColor: 'cyan'
};

const itemsContainer: CSSProperties = {
  display: "flex",
  flex: 1,
  justifyContent: "flex-start",
  alignItems: "flex-start",
  alignContent: 'flex-start',
  flexDirection: "row",
  flexWrap: 'wrap',
  gap: 1,
  // backgroundColor: 'cyan'
};
