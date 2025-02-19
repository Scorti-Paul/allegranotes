import * as React from "react";
import TopBarProgress from "react-topbar-progress-indicator";

TopBarProgress.config({
  barColors: {
    0: "#fff",
    "0.5": "#475569",
    "1.0": "#0f172a",
  },
  shadowBlur: 5,
});

const TopLoader = () => {
  return (
    <React.Fragment>
      <TopBarProgress />
    </React.Fragment>
  );
};

export default TopLoader;