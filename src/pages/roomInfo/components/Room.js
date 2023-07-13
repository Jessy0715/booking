import { useState } from "react";
import {
  Paper,
  Grid,
  Typography,
  Box,
  Button,
  Pagination,
  PaginationItem,
} from "@mui/material";
import roomImg1 from "@/assets/image/room1.jpg";
import roomImg2 from "@/assets/image/room2.jpg";
import { useStyles } from "../../../bookingStyle";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import RoomTable from "./RoomTable";

// Table 相關組件: TableContainer, Table, TableHead, TableBody, TableRow, TableCell, tableCellClasses

const Room = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // pagination active 狀態
  const renderPageItem = (item) => {
    const isActive = item.page === currentPage;
    const bgColor = isActive ? "#938C8C" : "#fff";
    return (
      <PaginationItem
        component="div"
        style={{ backgroundColor: bgColor }}
        {...item}
      />
    );
  };

  const handlePageChange = (ev, page) => {
    setCurrentPage(page);
  };

  const classes = useStyles();
  const data = [
    {
      id: 1,
      backgroundImage: `url(${roomImg1})`,
      title: "普101館",
      desc: "1樓，階梯教室，空間可容納 302 人。",
      price: [
        {
          name: "場地清潔費",
          morning: "2000",
          afternoon: "2500",
          night: "3500",
        },
      ],
    },
    {
      id: 2,
      backgroundImage: `url(${roomImg2})`,
      title: "普102館",
      desc: "2樓，階梯教室，空間可容納 400 人。",
      price: [
        {
          name: "場地清潔費",
          morning: "2000",
          afternoon: "2500",
          night: "4000",
        },
      ],
    },
  ];
  return (
    <>
      <Paper component="main" elevation={0} sx={{ backgroundColor: "#E5E5E5" }}>
        <Grid container direction="column" justifyContent="flex-start">
          {data.map((el) => {
            const { id, backgroundImage, title, desc, price } = el;
            return (
              <Paper
                key={id}
                elevation={0}
                component="section"
                square
                sx={{
                  mb: 5,
                  minWidth: "80vw",
                  marginX: "auto",
                  backgroundColor: "#fff",
                  p: 3
                }}
              >
                <Grid
                  container
                  direction="row"
                  alignItems="stretch"
                  wrap="nowrap"
                >
                  <Box
                    sx={{
                      backgroundImage: backgroundImage,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      mr: 3.5,
                      width: "300px",
                      height: "185px",
                    }}
                  />
                  <Grid>
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="start"
                    >
                      <Box>
                        <Grid container alignItems="center">
                          <ArrowRightIcon fontSize="large" color="secondary" />
                          <Typography variant="subtitle2">{title}</Typography>
                        </Grid>
                        <Box sx={{ fontSize: "14px" }} className={classes.pd}>
                          {desc}
                        </Box>
                      </Box>
                      <Box>
                        <Button variant="outlined">前往預約</Button>
                      </Box>
                    </Grid>
                    <Box>
                      <RoomTable id={id} price={price} />
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            );
          })}
          <Box
            sx={{
              minWidth: "80vw",
              marginX: "auto",
            }}
          >
            <Grid container direction="row" justifyContent="flex-end">
              <Box>
                <Pagination
                  count={10}
                  variant="string"
                  shape="rounded"
                  size="large"
                  page={currentPage}
                  renderItem={renderPageItem}
                  onChange={handlePageChange}
                />
              </Box>
            </Grid>
          </Box>
        </Grid>
      </Paper>
      <div style={{ height: "100px" }}></div>
    </>
  );
};

export default Room;
