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
  FormHelperText,
  Link,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import mainRoom from "@/assets/image/mainRoom.jpg";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [error, setError] = useState(false);
  // const [emptyError, setEmptyError] = useState(false);
  const [accountEmptyError, setAccountEmptyError] = useState(false);
  const [passwordEmptyError, setPasswordEmptyError] = useState(false);

  const handleAccountChange = (ev) => {
    const newAccount = ev.target.value;
    setAccount(newAccount);
    setAccountEmptyError(false); // 清除帳號必填錯誤提示
  };
  const handlePwdChange = (ev) => {
    const newPassword = ev.target.value;
    setPassword(newPassword);

    // 密碼格式驗證 (長度要8碼，要大小寫英文及數字)
    const isValidPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(
      newPassword
    );
    setError(!isValidPassword);
    setPasswordEmptyError(false); // 清除密碼必填錯誤提示
  };
  const handleClickShowPassword = () =>
    setShowPassword((showPassword) => !showPassword);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [registerError, setRegisterError] = useState("");

  const handleRegister = async () => {
    if (!account) { setAccountEmptyError(true); return; }
    if (!password) { setPasswordEmptyError(true); return; }
    if (error) return;

    try {
      const res  = await fetch("http://localhost:3001/api/auth/register", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ account, password }),
      });
      const json = await res.json();

      if (!json.success) {
        setRegisterError(json.message || "註冊失敗");
        return;
      }
      navigate("/login");
    } catch {
      setRegisterError("無法連線至伺服器");
    }
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
              sx={{ mb: 4 }}
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
                sx={{ m: 1, width: "70%", mb: 2 }}
                variant="outlined"
                size="small"
                error={accountEmptyError}
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
                  value={account}
                  onChange={handleAccountChange}
                  placeholder="請輸入帳號"
                ></OutlinedInput>
                {accountEmptyError && <FormHelperText>必填欄位</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid container direction="row" justifyContent="center">
              <FormControl
                sx={{ m: 1, width: "70%", mb: 2 }}
                variant="outlined"
                size="small"
                error={error || passwordEmptyError}
              >
                <InputLabel htmlFor="password">密碼</InputLabel>
                <OutlinedInput
                  id="password"
                  placeholder="請輸入密碼"
                  value={password}
                  onChange={handlePwdChange}
                  type={showPassword ? "password" : "text"}
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
                {(error || passwordEmptyError) && (
                  <FormHelperText>
                    {passwordEmptyError ? "必填欄位" : "您輸入的密碼格式有錯誤"}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid container direction="row" justifyContent="center">
              <Box sx={{ m: 1, width: "70%" }}>
                <Button fullWidth variant="contained" onClick={handleRegister}>
                  註冊
                </Button>
              </Box>
            </Grid>
            {registerError && (
              <Grid container direction="row" justifyContent="center">
                <Box sx={{ m: 1, width: "70%", textAlign: "center" }}>
                  <small style={{ color: "#d32f2f" }}>{registerError}</small>
                </Box>
              </Grid>
            )}
            {/* 返回登入連結 */}
            <Grid container direction="row" justifyContent="center">
              <Box sx={{ m: 1, width: "70%", textAlign: "center" }} component="span">
                <small>
                  已有帳號？{" "}
                  <Link
                    href="#"
                    underline="hover"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/login");
                    }}
                  >
                    點此登入
                  </Link>
                </small>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
};

export default Register;
