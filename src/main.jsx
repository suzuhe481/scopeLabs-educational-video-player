import React from "react";
import ReactDOM from "react-dom/client";

import Router from "./Router";
import Navbar from "./components/Navbar/Navbar";

import "./reset.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Navbar />
    <Router />
  </React.StrictMode>
);
