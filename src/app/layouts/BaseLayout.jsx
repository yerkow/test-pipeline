import { Footer } from "@/widgets";
import { Box } from "@mui/material";
import { Header } from "@widgets/header";
import React from "react";
import { Outlet } from "react-router-dom";
export const BaseLayout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Box sx={{ flex: 1 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};
