import { Paper, Grid, Container, Typography, Box, Button } from "@mui/material";
import roomImg1 from "@/assets/image/room1.jpg";
import roomImg2 from "@/assets/image/room2.jpg";
import { useStyles } from "../../../bookingStyle";

import ArrowRightIcon from "@mui/icons-material/ArrowRight";
const RoomTable = () => {
  const classes = useStyles();
  const data = [
    {
      id: 1,
      image: roomImg1,
      title: "普101館",
      desc: "1樓，階梯教室，空間可容納 302 人。",
      price: {
        morning: "2000",
        afternoon: "2500",
        night: "3500",
      },
    },
    {
      id: 2,
      image: roomImg2,
      title: "普102館",
      desc: "2樓，階梯教室，空間可容納 400 人。",
      price: {
        morning: "2000",
        afternoon: "2500",
        night: "4000",
      },
    },
  ];
  return (
    <>
      <Paper component="main" elevation={0}>
        <Grid container direction="column" justifyContent="flex-start">
          {data.map((el) => {
            const { id, image, title, desc, price } = el;
            return (
              <Paper
                key={id}
                elevation={0}
                component="section"
                square
                sx={{ marginBottom: "20px", minWidth: "80vw", marginX: "auto" }}
              >
                <Grid container direction="row" alignItems="center" wrap="nowrap">
                  <img src={image} width="220" />
                  <Grid container direction="row" justifyContent="start" alignItems="start">
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
                </Grid>
              </Paper>
            );
          })}
        </Grid>
      </Paper>
      <div style={{ height: "100px" }}></div>
    </>
  );
};

export default RoomTable;
