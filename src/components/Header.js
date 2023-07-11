import { Paper, Grid } from "@mui/material";
const Header = () => {
  return (
    <>
      <Paper
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
            <h2>教室場地借用管理系統</h2>
          </Grid>
          <Grid item sm={8} sx={{ textAlign: "right" }}>
            <div>登出</div>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default Header;
