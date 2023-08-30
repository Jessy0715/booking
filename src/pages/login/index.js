import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Paper,
  Grid,
  Box,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
  IconButton,
  Link,
  Snackbar,
  Alert,
  styled,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import avatar1 from "@/assets/avatar/member1.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [error, setError] = useState(false);
  const [accountEmptyError, setAccountEmptyError] = useState(false);
  const [passwordEmptyError, setPasswordEmptyError] = useState(false);
  const [alert, setAlert] = useState(false);

  const handleAdminGetIn = () => {
    if (!account || !password) {
      setAlert(true);
      return;
    }
    if (!error) {
      // 執行登入邏輯，例如：
      // api.login(account, password).then((response) => { ... });

      // 關閉警告訊息
      setAlert(false);

      // 轉到管理員頁面
      navigate("/admin");
    }
  };
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

  const handleMouseDownPassword = (ev) => {
    ev.preventDefault();
  };

  // 登入
  const handleLogin = () => {
    if (!account) {
      setAccountEmptyError(true);
    }
    if (!password) {
      setPasswordEmptyError(true);
    }
    // reset
    // setAccount("");
    // setPassword("");
    // setEmptyError(false);

    // 執行登入邏輯，可能涉及後端API調用等
    if (error) {
      // 密碼格式錯誤，顯示錯誤訊息
      return;
    }

    // 執行登入邏輯，例如：
    // api.login(account, password).then((response) => { ... });
  };
  const CustomizedIcon = styled(AccountCircleOutlinedIcon)({
    fontSize: 80, // 設置圖標的大小
    // 這裡可以添加其他樣式屬性，例如 color、margin、padding 等
  });
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
            {/* <Link href="/admin" underline="none">

            </Link> */}
            <small onClick={handleAdminGetIn}>管理員進入</small>
          </Box>
          <Grid container direction="column" justifyContent="center">
            <Grid
              container
              direction="row"
              justifyContent="center"
              sx={{ mt: 5, mb: 2 }}
            >
              {/* <Avatar
                alt="member"
                src={avatar1}
                sx={{
                  width: { sm: 70, md: 128 },
                  height: "auto",
                  mt: 4,
                  mb: 4,
                }}
              /> */}
              <Box sx={{ fontSize: 30 }}>
                <CustomizedIcon className="bigIcon" color="primary" />
              </Box>
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
                <Button fullWidth variant="contained" onClick={handleLogin}>
                  登入
                </Button>
              </Box>
            </Grid>
            <Grid container direction="row" justifyContent="center">
              <Box sx={{ m: 1, width: "70%" }} component="span">
                <small>
                  <Link href="/register" underline="none">
                    立即註冊
                  </Link>
                </small>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      <Snackbar
        open={alert}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setAlert(false)}
      >
        <Alert
          onClose={() => setAlert(false)}
          severity="warning"
          sx={{ width: "100%" }}
        >
          您的欄位尚未填寫
        </Alert>
      </Snackbar>
    </>
  );
};

export default Login;
