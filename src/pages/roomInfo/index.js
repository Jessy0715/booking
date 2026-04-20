import { Outlet } from "react-router-dom";
import { Paper, Grid, Container, Typography, Box } from "@mui/material";
import Header from "@/components/Header";
import Room from "./components/Room";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

// 網址可以換成剛剛幫你生成的圖片，或者你喜歡的無版權圖片
const BANNER_URL = "https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";

const RoomInfo = () => {
  return (
    <>
      <Header />
      {/* --- 新增的 Hero Banner --- */}
      <Box
        sx={{
          height: { xs: "250px", md: "400px" },
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url(${BANNER_URL})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          textAlign: "center"
        }}
      >
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Lumino 自然光攝影棚
        </Typography>
        <Typography variant="h6">
          尋找完美的拍攝空間，捕捉每個動人瞬間。
        </Typography>
      </Box>

      {/* --- 原本的場地列表區塊 --- */}
      <Paper
        component="section"
        elevation={0}
        sx={{ backgroundColor: "#f5f3ef", pt: 3, pb: 6 }}
      >
        <Container maxWidth="lg" sx={{ pt: 3, pb: 3 }}>
          <Grid container direction="row" alignItems="center" sx={{ mb: 2 }}>
            <ArrowRightIcon fontSize="large" sx={{ color: "#8b7355" }} />
            <Typography variant="h5" fontWeight="bold" sx={{ color: "#3e2723" }}>
              精選空間
            </Typography>
          </Grid>
        </Container>
        <Room></Room>
      </Paper>
      <Outlet />
    </>
  );
};

export default RoomInfo;
