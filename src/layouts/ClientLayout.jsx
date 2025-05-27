import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const ClientLayout = () => {
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Header />

        <main className="flex-grow-1 p-4 bg-light">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ClientLayout;
