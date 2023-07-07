import { Outlet } from "react-router-dom";
import { Paper, Grid, Container, Typography } from "@mui/material";
import Header from "components/Header";

import ArrowRightIcon from "@mui/icons-material/ArrowRight";
const RoomInfo = () => {
  return (
    <>
    <Header />
      {/* <Paper
        square
        component="section"
        sx={{
          backgroundColor: "#938C8C",
          color: "#fff",
          paddingX: "24px",
          paddingY: "45PX",
        }}
      >
        <Grid container direction="column">
          <Grid item sm={8}>
            <h3>教室場地借用管理系統</h3>
          </Grid>
          <Grid item sm={8} sx={{ textAlign: "right" }}>
            <div>登出</div>
          </Grid>
        </Grid>
      </Paper> */}
      <Paper component="section" elevation={0}>
        <Container maxWidth="lg" sx={{ paddingY: '20px'}}>
          <Grid container direction="row" alignItems="center">
            <ArrowRightIcon fontSize="large" color="primary" />
            <Typography variant="subtitle1">空間查詢</Typography>
          </Grid>
        </Container>
      </Paper>
      <Outlet />
    </>
  );
};

export default RoomInfo;
