import { Box, Container, Paper, Typography } from "@mui/material";
import React from "react";

export const Location = () => {
  return (
    <Container sx={{ padding: "50px" }}>
      <Typography variant="h3" sx={{ textAlign: "center", fontWeight: "500" }}>
        Как найти центр Haval?
      </Typography>
      <Typography
        variant="body1"
        sx={{ textAlign: "center", marginTop: "20px" }}
      >
        Вы всегда можете обратиться в официальный дилерский центр HAVAL по
        вопросам приобретения нового автомобиля, сдачи вашего в trade-in, а
        также, чтобы записаться на плановое ТО.
      </Typography>
      <Paper sx={{ display: "flex", height: "400px", marginTop: "30px" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Box
            sx={{
              padding: "10px 20px",
              backgroundColor: "#000",
              color: "#fff",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "500" }}>
              Семей
            </Typography>
          </Box>
          <Box sx={{ padding: "20px" }}>
            <Typography variant="h5" sx={{ fontWeight: "600" }}>
              Haval
            </Typography>
            <Typography variant="body1">ул. Валиханова 147</Typography>
            <Typography variant="body1">Телефон: 8 (727) 310-37-16</Typography>
            <Typography variant="body1">
              Email: m.reseptionhaval@mycar.kz
            </Typography>
          </Box>
        </Box>
        <Box sx={{ flexGrow: 2 }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2542.540933974716!2d80.2529768765318!3d50.412392471585015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x42f26556f95cabb7%3A0x517f202361471378!2z0JDQstGC0L7RgdCw0LvQvtC9IEhhdmFs!5e0!3m2!1sru!2skz!4v1716123859381!5m2!1sru!2skz"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </Box>
      </Paper>
    </Container>
  );
};
