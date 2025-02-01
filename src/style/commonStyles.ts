import { CSSProperties } from "react";
import { hexToRgba } from "../util/utilMethods";

class CommonStyles {
  contentContainer: CSSProperties = {
    display: "flex",
    flex: 1,
    justifyContent: "start",
    alignItems: "stretch",
    flexDirection: "column",
    padding: "20px",
  };
}

class DebugStyles {
  debugFrame1: CSSProperties = {
    backgroundColor: hexToRgba("#5cfaff", 0.3), // #5cfaff
  };
  debugFrame2: CSSProperties = {
    backgroundColor: hexToRgba("#7fff6b", 0.3), // #7fff6b
  };
  debugFrame3: CSSProperties = {
    backgroundColor: hexToRgba("#eeff6b", 0.3), // #eeff6b
  };
  placeholder: CSSProperties = {};
}

const $commonStyles = new CommonStyles();
const $debugStyles = new DebugStyles();

export { $commonStyles, $debugStyles };
