import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import { Box, Container, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

const swiperList = [
  {
    position: "flex-start",
    modelName: "M6",
    price: 7990000,
    path: "/models/m6",
    image: "./images/image_b.webp",
  },
  {
    position: "flex-end",
    modelName: "Dargo",
    price: 11990000,
    path: "/models/dargo",
    image: "./images/dargo.webp",
  },
  {
    position: "flex-end",
    modelName: "H6 GT",
    price: 13790000,
    path: "/models/m4",
    image: "./images/h6gt.webp",
  },
  {
    position: "flex-start",
    modelName: "Dargo X",
    price: 13090000,
    path: "/models/m4",
    image: "./images/dargox.webp",
  },
  {
    position: "center",
    modelName: "Jolion",
    price: 5990000,
    path: "/models/jolion",
    image: "./images/jolion.webp",
  },
];

export const HeroSwiper = () => {
  const theme = useTheme();

  return (
    <Swiper
      pagination={{
        dynamicBullets: true,
      }}
      modules={[Pagination]}
      className="mySwiper"
    >
      {swiperList.map((item, index) => (
        <SwiperSlide key={index}>
          <Box
            sx={{
              backgroundImage: `url(${item.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "calc(100vh - 64px)",
              display: "flex",
              alignItems: "center",
              color: "white",
              fontSize: "2rem",
            }}
          >
            <Container
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: item.position,
              }}
            >
              <Typography component="h1" variant="h1" fontWeight="600">
                {item.modelName}
              </Typography>
              <Typography variant="body1" fontSize="46px">
                от {item.price.toLocaleString()} тг.
              </Typography>
              <Link
                to={item.path}
                style={{
                  marginTop: "20px",
                  padding: "10px 40px",
                  fontSize: "1.5rem",
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: "5px",
                }}
              >
                Подробнее
              </Link>
            </Container>
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
