import { KeyboardArrowUp } from "@mui/icons-material";
import {
  Box,
  Button,
  Collapse,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const modelEquipmentList = ["COMFORT", "ELITE", "PREMIUM", "TECH PLUS"];
const tableData = [
  {
    title: "КОМПЛЕКТАЦИЯ",
    data: [
      {
        title: "ДВИГАТЕЛЬ 2.0T 2WD",
        list: ["11 990 000", "12 890 000", "113 390 000", "14 390 000"],
      },
      {
        title: "ДВИГАТЕЛЬ 2.0T 4WD",
        list: ["11 990 000", "12 890 000", "113 390 000", "14 390 000"],
      },
    ],
  },
  {
    title: "Экстерьер",
    data: [
      {
        title: "Панорамная крыша с люком",
        list: [false, false, true, true],
      },
      {
        title: "Электропривод двери багажника с сенсором",
        list: [false, false, true, true],
      },
      {
        title: "Хромированная окантовка дверей",
        list: [false, false, false, true],
      },
      {
        title: "Боковая подножка",
        list: [false, false, false, true],
      },
    ],
  },
];

const TableRowComponent = ({ row }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment key={row.title}>
      <TableRow sx={{ cursor: "pointer" }} onClick={handleClick}>
        <TableCell component="th" scope="row">
          {row.title}
        </TableCell>
        <TableCell align="right">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={handleClick}
          >
            <KeyboardArrowUp />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    {modelEquipmentList.map((equipment) => (
                      <TableCell align="center">{equipment}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.data.map((dataRow, index) => (
                    <TableRow key={index}>
                      <TableCell>{dataRow.title}</TableCell>
                      {dataRow.list.map((data) => (
                        <TableCell align="center">
                          {typeof data === "string" ? data : data ? "+" : ""}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export const ModelDetails = ({ model }) => {
  const { id, modelName, price, mainVideo, specifications } = model;

  return (
    <Box>
      <Box
        sx={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "80vh",

          color: "white",
          fontSize: "2rem",
        }}
      >
        <video muted loop autoPlay style={{
          width: "100%",
          height: "80vh",
          objectFit: "cover",
          position: "absolute",
          zIndex: "-1",
        
        }}>
          <source type="video/mp4" src={mainVideo}/>
        </video>
        <Container>
          <Box paddingTop="100px">
            <Typography variant="h1" sx={{ fontWeight: "400" }}>
              {modelName}
            </Typography>
            <Button
              variant="contained"
              sx={{
                marginTop: "25px",
                color: "#fff",
                backgroundColor: "#000",
                fontWeight: "600",
                fontSize: "18px",
                padding: "10px 30px",
              }}
            >
              Отправить заявку
            </Button>
          </Box>
        </Container>
      </Box>
      <Container>
        <Box sx={{ padding: "50px" }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "600",
              marginTop: "50px",
              textTransform: "uppercase",
            }}
          >
            Основные характиристики
          </Typography>
          <Box
            sx={{
              marginTop: "30px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "40px",
            }}
          >
            {specifications.map((spec) => (
              <Box
                key={spec.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "400",
                    flex: 1,
                    color: "#AAAAAA",
                  }}
                >
                  {spec.specification}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ flex: 1, textAlign: "right" }}
                >
                  {spec.content}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {tableData.map((row) => (
                <TableRowComponent row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
};
