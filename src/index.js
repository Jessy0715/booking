import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createTheme, ThemeProvider } from '@mui/material/styles';

// css 重置
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";

const bookingTheme = createTheme({
  palette: {
    primary: {
      main: '#938C8C',
      dark: '#757070'
    },
  },
  typography: {
    subtitle1: {
      fontSize: 14,
    },
  }
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScopedCssBaseline>
      <ThemeProvider theme={bookingTheme}>
        <App />
      </ThemeProvider>
      </ScopedCssBaseline>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
