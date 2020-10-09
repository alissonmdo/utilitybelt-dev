import React from "react";
import { Card } from "@blueprintjs/core";
function App() {
  return (
    <Card
      className="main-card"
      interactive={false}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "5px",
      }}
    ></Card>
  );
}

export default App;
