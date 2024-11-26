import { Button } from "@mui/material";
import { CSSProperties } from "react";

export default function ShopScreen() {
  return (
    <div style={container}>
      <Button variant="contained">Hello world</Button>
    </div>
  );
}

const container: CSSProperties = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  height: "100%",
  
  backgroundColor: "cyan",
};
