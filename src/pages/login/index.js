import { useState } from "react";
import {
  Avatar,
  Paper,
  Grid,
  TextField,
  Box,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Link,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import avatar1 from "@/assets/avatar/member1.jpg";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Paper
          component="main"
          elevation={1}
          sx={{
            minWidth: "25vw",
            maxWidth: "20vw",
            marginX: "auto",
            position: "relative",
            pt: 2,
            pb: 2,
          }}
        >
          <Box
            component="span"
            sx={{
              position: "absolute",
              left: 10,
              top: 5,
              color: "#938C8C",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            <Link href="/register" underline="none">
              <small>管理員進入</small>
            </Link>
          </Box>
          <Grid container direction="column" justifyContent="center">
            <Grid container direction="row" justifyContent="center">
              <Avatar
                alt="member"
                src={avatar1}
                sx={{
                  width: { sm: 70, md: 128 },
                  height: "auto",
                  mt: 4,
                  mb: 4,
                }}
              />
            </Grid>
            <Grid container direction="row" justifyContent="center">
              <FormControl
                sx={{ m: 1, width: "70%" }}
                variant="outlined"
                size="small"
              >
                <InputLabel
                  htmlFor="account"
                  sx={{
                    backgroundColor: "white",
                  }}
                >
                  帳號
                </InputLabel>
                <OutlinedInput
                  id="account"
                  placeholder="請輸入帳號"
                ></OutlinedInput>
              </FormControl>
            </Grid>
            <Grid container direction="row" justifyContent="center">
              <FormControl
                sx={{ m: 1, width: "70%" }}
                variant="outlined"
                size="small"
              >
                <InputLabel
                  htmlFor="password"
                >
                  密碼
                </InputLabel>
                <OutlinedInput
                  id="password"
                  placeholder="請輸入密碼"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </Grid>
            <Grid container direction="row" justifyContent="center">
              <Box sx={{ m: 1, width: "70%" }}>
                <Button fullWidth variant="contained">
                  登入
                </Button>
              </Box>
            </Grid>
            <Grid container direction="row" justifyContent="center">
              <Box sx={{ m: 1, width: "70%" }} component="span">
                <small>立即註冊</small>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
};

export default Login;
