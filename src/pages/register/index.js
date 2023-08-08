import { useState } from "react";
import {
  Paper,
  Grid,
  Box,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import mainRoom from "@/assets/image/mainRoom.jpg";
const Register = () => {
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
            pb: 3,
          }}
        >
          <Grid container direction="column" justifyContent="center">
            <Grid
              container
              direction="row"
              justifyContent="center"
              sx={{ mb: 2 }}
            >
              <Box
                sx={{
                  backgroundImage: `url(${mainRoom})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  width: "300%",
                  height: "185px",
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
                <InputLabel htmlFor="password">密碼</InputLabel>
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
                  註冊
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
};

export default Register;
