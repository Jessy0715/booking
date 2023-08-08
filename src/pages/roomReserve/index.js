import { useState } from "react";
import Header from "@/components/Header";
import {
  Paper,
  Grid,
  TextField,
  Divider,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import SquareIcon from "@mui/icons-material/Square";
import CropDinIcon from "@mui/icons-material/CropDin";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
const RoomReserve = () => {
  const [checked, setChecked] = useState([true, false]);
  const handleChange = (event) => {
    setChecked([event.target.checked, checked[1]]);
  };
  return (
    <>
      <Header />
      <Paper
        component="section"
        elevation={0}
        sx={{ pt: 7, pb: 8, mt: 1, maxWidth: "70vw", marginX: "auto" }}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ mb: 4 }}
        >
          <TextField
            required
            id="rent-type"
            label="租借館別"
            variant="outlined"
            sx={{ mr: 3 }}
          />
          <TextField
            required
            id="rent-date"
            label="租借日期"
            variant="outlined"
            sx={{ mr: 3 }}
          />
          <TextField
            required
            id="rent-reason"
            label="租借事由"
            variant="outlined"
            sx={{ mr: 3 }}
          />
          <SearchIcon
            fontSize="large"
            color="secondary"
            sx={{ cursor: "pointer" }}
          />
        </Grid>
        <Divider
          variant="middle"
          sx={{
            borderWidth: "1.2px",
            borderColor: "#938C8C",
            marginLeft: 0,
            marginRight: 0,
            mb: 5,
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            mb: 3,
          }}
        >
          <Box>
            <Typography variant="subtitle2">
              請點擊或框選需要預約的時段進行預約
            </Typography>
            <Typography variant="subtitle2">
              上午 08:00~12:00 / 下午 13:00~17:00 / 晚上 18:00~22:00
            </Typography>
          </Box>
          <Box>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ display: "flex" }}>
                <CropDinIcon fontSize="large" color="primary" />
                <Typography variant="subtitle1">可預約</Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                <SquareIcon fontSize="large" color="secondary" />
                <Typography variant="subtitle1">不可預約</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 5 }}>
          <Button variant="contained">立即預約</Button>
        </Box>
        <Grid container direction="row" alignItems="center" sx={{ mb: 2 }}>
          <ArrowRightIcon fontSize="large" color="primary" />
          <Typography variant="subtitle1">租借場地時段表</Typography>
        </Grid>

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Button
            sx={{
              border: "none",
              background: "#fff",
              "&:hover": {
                border: "none",
                background: "transparent",
              },
            }}
            variant="outlined"
            startIcon={<ArrowBackIosNewIcon />}
          >
            <small>前一周</small>
          </Button>
          <Box sx={{ color: "#938C8C" }}>
            <span>2023年 03月 01日 - 2023年 03月 07日</span>
          </Box>
          <Button
            sx={{
              border: "none",
              background: "#fff",
              "&:hover": {
                border: "none",
                background: "transparent",
              },
            }}
            variant="outlined"
            endIcon={<ArrowForwardIosIcon />}
          >
            <small>後一周</small>
          </Button>
        </Grid>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  rowSpan={2}
                  sx={{ borderRight: "1px solid #e5e5e5" }}
                >
                  場地
                </TableCell>
                <TableCell
                  align="center"
                  rowSpan={2}
                  sx={{ borderRight: "1px solid #e5e5e5" }}
                >
                  時段
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ borderRight: "1px solid #e5e5e5" }}
                >
                  03/01
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ borderRight: "1px solid #e5e5e5" }}
                >
                  03/02
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ borderRight: "1px solid #e5e5e5" }}
                >
                  03/03
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ borderRight: "1px solid #e5e5e5" }}
                >
                  03/04
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ borderRight: "1px solid #e5e5e5" }}
                >
                  03/05
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ borderRight: "1px solid #e5e5e5" }}
                >
                  03/06
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ borderRight: "1px solid #e5e5e5" }}
                >
                  03/07
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{ borderRight: "1px solid #e5e5e5" }}
                >
                  六
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ borderRight: "1px solid #e5e5e5" }}
                >
                  日
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ borderRight: "1px solid #e5e5e5" }}
                >
                  一
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ borderRight: "1px solid #e5e5e5" }}
                >
                  二
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ borderRight: "1px solid #e5e5e5" }}
                >
                  三
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ borderRight: "1px solid #e5e5e5" }}
                >
                  四
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ borderRight: "1px solid #e5e5e5" }}
                >
                  五
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell
                  align="center"
                  rowSpan={3}
                  sx={{ borderRight: "1px solid #e5e5e5" }}
                >
                  普 101
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    borderRight: "1px solid #e5e5e5",
                    background: "#938C8C",
                    color: "#fff",
                  }}
                >
                  上午
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ borderRight: "1px solid #e5e5e5", px: 0, py: 0 }}
                >
                  <Checkbox
                    size="large"
                    sx={{
                      px: 0,
                      py: 0,
                      "& .MuiSvgIcon-root": {
                        fontSize: "30px", // 使內部的 SVG 圖標大小繼承父元素的大小
                      },
                    }}
                  />
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ borderRight: "1px solid #e5e5e5" }}
                ></TableCell>
                <TableCell
                  align="center"
                  sx={{ borderRight: "1px solid #e5e5e5" }}
                ></TableCell>
                <TableCell
                  align="center"
                  sx={{ borderRight: "1px solid #e5e5e5" }}
                ></TableCell>
                <TableCell
                  align="center"
                  sx={{ borderRight: "1px solid #e5e5e5" }}
                ></TableCell>
                <TableCell
                  align="center"
                  sx={{ borderRight: "1px solid #e5e5e5" }}
                ></TableCell>
                <TableCell
                  align="center"
                  sx={{ borderRight: "1px solid #e5e5e5" }}
                ></TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{
                    borderRight: "1px solid #e5e5e5",
                    background: "#938C8C",
                    color: "#fff",
                  }}
                >
                  下午
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ borderRight: "1px solid #e5e5e5" }}
                ></TableCell>
                <TableCell
                  align="center"
                  sx={{ borderRight: "1px solid #e5e5e5" }}
                ></TableCell>
                <TableCell
                  align="center"
                  sx={{ borderRight: "1px solid #e5e5e5" }}
                ></TableCell>
                <TableCell
                  align="center"
                  sx={{ borderRight: "1px solid #e5e5e5" }}
                ></TableCell>
                <TableCell
                  align="center"
                  sx={{ borderRight: "1px solid #e5e5e5" }}
                ></TableCell>
                <TableCell
                  align="center"
                  sx={{ borderRight: "1px solid #e5e5e5" }}
                ></TableCell>
                <TableCell
                  align="center"
                  sx={{ borderRight: "1px solid #e5e5e5" }}
                ></TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{
                    borderRight: "1px solid #e5e5e5",
                    background: "#938C8C",
                    color: "#fff",
                  }}
                >
                  晚上
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ borderRight: "1px solid #e5e5e5" }}
                ></TableCell>
                <TableCell
                  align="center"
                  sx={{ borderRight: "1px solid #e5e5e5" }}
                ></TableCell>
                <TableCell
                  align="center"
                  sx={{ borderRight: "1px solid #e5e5e5" }}
                ></TableCell>
                <TableCell
                  align="center"
                  sx={{ borderRight: "1px solid #e5e5e5" }}
                ></TableCell>
                <TableCell
                  align="center"
                  sx={{ borderRight: "1px solid #e5e5e5" }}
                ></TableCell>
                <TableCell
                  align="center"
                  sx={{ borderRight: "1px solid #e5e5e5" }}
                ></TableCell>
                <TableCell
                  align="center"
                  sx={{ borderRight: "1px solid #e5e5e5" }}
                ></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default RoomReserve;
