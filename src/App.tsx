import React from "react";
import { useRoutes } from "react-router";
// import "./App.css";
import { routes } from "./routes";

function App() {
  const routing = useRoutes(routes);

  return <div className="App">{routing}</div>;
}

export default App;
