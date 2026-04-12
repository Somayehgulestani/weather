import React from "react";
import ReactDom from "react-dom/client";
import "./tailwind.css";
// import "./index.css";

// import { CarRental } from "./CarRental.js";
// import App from "./Trip.js";
// import App from "./App-1.js";
import App from "./weather.js";

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <CarRental /> */}
    {/* <App /> */}
    {/* <App /> */}
    <App />
  </React.StrictMode>,
);
