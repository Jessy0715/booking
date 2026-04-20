import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
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
  Tabs,
  Tab
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
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
  const [loginRole, setLoginRole] = useState(0); // 0: 會員, 1: 管理員

  const handleRoleChange = (event, newValue) => {
    setLoginRole(newValue);
    setAccountEmptyError(false);
    setPasswordEmptyError(false);
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
  const handleLogin = async () => {
    if (!account) { setAlert(true); setAccountEmptyError(true); return; }
    if (!password) { setAlert(true); setPasswordEmptyError(true); return; }
    if (error) return;

    try {
      const res  = await fetch("http://localhost:3001/api/auth/login", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ account, password }),
      });
      const json = await res.json();

      if (!json.success) {
        setAlert(true);
        return;
      }

      // 儲存登入資訊
      localStorage.setItem("user", JSON.stringify(json.data));

      // 依角色跳轉（前端 Tab 僅作 UI，實際角色以 API 回傳為準）
      if (json.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/roomInfo");
      }
    } catch {
      setAlert(true);
    }
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
          <Tabs
            value={loginRole}
            onChange={handleRoleChange}
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
            sx={{ mb: 2 }}
          >
            <Tab label="一般會員" />
            <Tab label="管理員" />
          </Tabs>

          <Grid container direction="column" justifyContent="center">
            <Grid
              container
              direction="row"
              justifyContent="center"
              sx={{ mt: 2, mb: 2 }}
            >
              <Box sx={{ fontSize: 30 }}>
                {loginRole === 0 ? (
                  <CustomizedIcon className="bigIcon" color="primary" />
                ) : (
                  <AdminPanelSettingsIcon sx={{ fontSize: 80, color: "#9e9e9e" }} />
                )}
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
              <Box sx={{ m: 1, width: "70%", textAlign: "center" }} component="span">
                <small>
                  還沒有帳號？{" "}
                  <Link
                    href="#"
                    underline="hover"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/register");
                    }}
                  >
                    立刻註冊
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
          {!account || !password ? "您的欄位尚未填寫" : "帳號或密碼錯誤"}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Login;
