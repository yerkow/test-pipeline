import { KeyboardArrowRight } from "@mui/icons-material";
import { Container, Typography, useTheme } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const SpecialOffers = () => {
  const {
    palette: { primary },
  } = useTheme();

  return (
    <Container sx={{ padding: "50px" }}>
      <Typography variant="h3" sx={{ textAlign: "center", fontWeight: "500" }}>
        Специальные предложиения
      </Typography>
      <img
        src="./images/special-offers.png"
        alt=""
        style={{ width: "100%", margin: "40px 0px" }}
      />
      <Link
        to="stocks"
        style={{
          textTransform: "uppercase",
          display: "flex",
          alignItems: "center",
          gap: "3px",
          fontSize: "18px",
        }}
      >
        Все специальные предложиения
        <KeyboardArrowRight />
      </Link>
    </Container>
  );
};
