import { Outlet } from "react-router-dom";
import { Paper, Grid, Container, Typography } from "@mui/material";
import Header from "@/components/Header";
import Room from "./components/Room";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
const RoomInfo = () => {
  return (
    <>
      <Header />
      <Paper component="section" elevation={0} sx={{ backgroundColor: '#e5e5e5', pt: 3, pb: 3 }}>
        <Container maxWidth="lg" sx={{ pt: 3, pb: 3 }}>
          <Grid container direction="row" alignItems="center">
            <ArrowRightIcon fontSize="large" color="primary" />
            <Typography variant="subtitle1">空間查詢</Typography>
          </Grid>
        </Container>
        <Room></Room>
      </Paper>
      <Outlet />
    </>
  );
};

export default RoomInfo;
