import { ButtonBase, Card, CardContent, Typography } from "@mui/material";
import { CSSProperties } from "react";
import { Article } from "../models/DbEntities";
import { useNavigate } from "react-router-dom";

interface ArticleCardProps {
  data: Article; // Define the expected prop type
}

const ArticleCard = ({ data }: ArticleCardProps) => {
  const navigate = useNavigate();
  return (
    <ButtonBase
      sx={articleCard}
      onClick={() => {
        navigate(`/ArticleDetails/${data.id}`, { state: { ...data } });
      }}
    >
      <Card variant="outlined">
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.name}
          </Typography>
          <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
            {data.note}
          </Typography>
        </CardContent>
      </Card>
    </ButtonBase>
  );
};

const articleCard: CSSProperties = {
  height: 150,
  width: 150,
};

export default ArticleCard;
