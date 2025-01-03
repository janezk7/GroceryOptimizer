import { CSSProperties } from "react";

class CommonStyles {
  contentContainer: CSSProperties = {
    display: "flex",
    flex: 1,
    justifyContent: "start",
    alignItems: "stretch",
    flexDirection: "column",
    padding: "20px"
  };
}

const commonStyles = new CommonStyles();

export { commonStyles };
