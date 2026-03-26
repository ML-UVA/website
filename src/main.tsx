import React from "react";
import ReactDOM from "react-dom/client";
import Warning from "@/components/custom/Warning/Warning";
import Header from "@/components/custom/Header/Header";
import AppRouter from "@/router/AppRouter";
import Footer from "@/components/custom/Footer/Footer";
// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap/js/dist/bootstrap.bundle.min";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Warning />
    <Header />
    <AppRouter />
    <Footer />
  </React.StrictMode>
);
