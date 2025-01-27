import { Box, Icon, SxProps, Typography } from "@mui/material";
import { ArticleShopPricing } from "../../models/DbEntities";
import DoneIcon from '@mui/icons-material/Done';
import { CSSProperties } from "react";

interface ArticleShopPricingItemProps {
  data: ArticleShopPricing;
  isLowestPrice: boolean
}

const ArticleShopPricingItem: React.FC<ArticleShopPricingItemProps> = (props) => {
  const pricing = props.data;
  return (
    <Box sx={container}>
      {props.isLowestPrice && <DoneIcon color={'success'} />}
      <Typography
      >{`${pricing.shopName}: ${pricing.pricePerUnit}/${pricing.priceUnitNameShort}`}</Typography>
    </Box>
  );
};

export default ArticleShopPricingItem;

const container: SxProps = {
  display: 'flex',
  flexDirection: 'row',
  padding: "5px"
}
