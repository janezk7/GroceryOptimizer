import { CSSProperties } from "react";

class CommonStyles {
  screenContainer: CSSProperties = {
    display: "flex",
    flex: 1,
    justifyContent: "start",
    alignItems: "stretch",
    flexDirection: "column",
  };
}

const commonStyles = new CommonStyles();

export { commonStyles };
