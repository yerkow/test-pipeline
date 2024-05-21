import { Logo, Navbar } from "@/entities";
import { AppBar, Container,Toolbar } from "@mui/material";
import React from "react";

export const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Logo />
          <Navbar />
        </Container>
      </Toolbar>
    </AppBar>
  );
};
