import { Box, CircularProgress, Fab, Typography } from "@mui/material";
import logo from "../logo.svg";
import AddIcon from "@mui/icons-material/Add";
import PostAddIcon from '@mui/icons-material/PostAdd';
import { CSSProperties, useEffect, useState } from "react";
import { Article } from "../../models/DbEntities";
import { apiService } from "../../services/apiServiceFactory";
import ArticleCard from "../../components/ArticleCard";
import { commonStyles } from "../../style";
import { useNavigate } from "react-router-dom";
import useFetchArticles from "../../hooks/useFetchArticles";

export default function ItemsScreen() {
  const navigate = useNavigate();
  const {isLoading, data: articles, error} = useFetchArticles();

  useEffect(() => {
    if(!error)
      return;
    alert(error);
  }, [error]);

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
      {!isLoading && (
        <Box sx={itemsContainer}>
          {articles &&
            articles.map((a, index) => <ArticleCard key={index} data={a} />)}
        </Box>
      )}
      <Fab
        style={fabStyle}
        color="primary"
        aria-label="add"
        onClick={() => navigate("/articleCreate")}
      >
        <PostAddIcon />
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
