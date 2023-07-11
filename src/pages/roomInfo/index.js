import { Outlet } from "react-router-dom";
import { Paper, Grid, Container, Typography } from "@mui/material";
import Header from "@/components/Header";
import RoomTable from "./components/RoomTable";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
const RoomInfo = () => {
  return (
    <>
      <Header />
      <Paper component="section" elevation={0}>
        <Container maxWidth="lg" sx={{ paddingY: "20px", marginBottom: "20px" }}>
          <Grid container direction="row" alignItems="center">
            <ArrowRightIcon fontSize="large" color="primary" />
            <Typography variant="subtitle1">空間查詢</Typography>
          </Grid>
        </Container>
        <RoomTable></RoomTable>
      </Paper>
      <Outlet />
    </>
  );
};

export default RoomInfo;
