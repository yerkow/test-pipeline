import { ModelCard } from "@/shared/ui";
import { Box, Container, Typography } from "@mui/material";
import React from "react";

export const BaseModels = ({ items }) => {
  return (
    <Container sx={{ padding: "40px 10px" }}>
      <Typography variant="h4">Кроссоверы и внедорожники</Typography>
      <Box
        sx={{
          marginTop: "30px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {items.map((item) => (
          <ModelCard key={item.title} item={item} />
        ))}
      </Box>
    </Container>
  );
};
