import { Paper, Grid, Link } from "@mui/material";

const Header = () => {
  return (
    <>
      <Paper
        square
        component="section"
        sx={{
          backgroundColor: "#938C8C",
          color: "#fff",
          pl: 4,
          pr: 4,
          pt: 7,
          pb: 7,
        }}
      >
        <Grid container direction="column">
          <Grid item sm={8}>
            <h2>教室場地借用管理系統</h2>
          </Grid>
          <Grid item sm={8} sx={{ textAlign: "right" }}>
          <Link href="/" underline="none" sx={{ color: "#fff" }}>
          登出
          </Link>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default Header;
