import { Box, ButtonBase, Card, CardContent, Typography } from "@mui/material";
import { CSSProperties } from "react";
import { Article } from "../models/DbEntities";
import { useNavigate } from "react-router-dom";
import { $debugStyles } from "../style/commonStyles";

import Burger from "@mui/icons-material/LunchDiningOutlined";

interface ArticleCardProps {
  data: Article; // Define the expected prop type
}

const ArticleCard = ({ data }: ArticleCardProps) => {
  const navigate = useNavigate();
  return (
    <ButtonBase
      sx={$outerButton}
      onClick={() => {
        navigate(`/ArticleDetails/${data.id}`, { state: { ...data } });
      }}
    >
      <Card sx={[$card]} variant="outlined">
        <CardContent sx={[$cardContent, $debugStyles.placeholder]}>
          <Box sx={[$wrapper, $debugStyles.placeholder]}>
            <Typography sx={[$title, $debugStyles.placeholder]} variant="subtitle1">
              {data.name}
            </Typography>
            {/* <Box sx={[$icon, $debugStyles.placeholder]}>
              <Burger fontSize="medium" />
            </Box> */}
            <Typography sx={[$subText, $debugStyles.placeholder]} variant="body1">
              {data.note}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </ButtonBase>
  );
};

const $outerButton: CSSProperties = {
  height: 120,
  width: 120,
};

const $card: CSSProperties = {
  flex: 1,
  height: "100%",
};

const $cardContent: CSSProperties = {
  display: "flex",
  flex: 1,
  height: '100%',
  padding: 0,
};

const $wrapper: CSSProperties = {
  display: "flex",
  flex: 1,
  height: "100%",
  flexDirection: "column",
  // justifyContent: "space-between",
  justifyContent: "space-around",
  alignContent: "stretch",
  gap: "4px",
  padding: "10px",
  paddingBottom: "5px",
  boxSizing: "border-box",
};

const $title: CSSProperties = {
  fontWeight: 'bold',
  lineHeight: '18px'
};

const $icon: CSSProperties = {
  display: "flex",
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
};

const $subText: CSSProperties = {
  color: "text.secondary",
  fontSize: "14px",
  lineHeight: '16px'
};

export default ArticleCard;
