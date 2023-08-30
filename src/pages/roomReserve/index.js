import { useState, useEffect, memo, Fragment } from "react";
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
import CropDinIcon from "@mui/icons-material/CropDin";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
const RoomReserve = () => {
  const select_locationData = [
    {
      location: "普 101",
      morning: [true, false, false, false, false, false, false],
      noon: [true, true, false, false, false, false, false],
      night: [true, true, false, false, false, false, false],
    },
    // {
    //   location: "普 102",
    //   morning: [true, false, false, false, false, false, false],
    //   noon: [true, true, false, false, false, false, false],
    //   night: [true, true, false, false, true, true, true],
    // },
  ];
  const columnsDate = [
    {
      date: "03/01",
    },
    {
      date: "03/02",
    },
    {
      date: "03/03",
    },
    {
      date: "03/04",
    },
    {
      date: "03/05",
    },
    {
      date: "03/06",
    },
    {
      date: "03/07",
    },
  ];
  const dayWeek = [
    {
      weekday: "六",
    },
    {
      weekday: "日",
    },
    {
      weekday: "一",
    },
    {
      weekday: "二",
    },
    {
      weekday: "三",
    },
    {
      weekday: "四",
    },
    {
      weekday: "五",
    },
  ];
  // const [isChecked, setIsChecked] = useState(false);
  // const handleCheckboxChange = (event) => {
  //   setIsChecked(event.target.checked);
  // };

  // useEffect(() => {
  //   console.log("isChecked:", isChecked);
  // }, [isChecked]);

  return (
    <>
      <Header />
      <Paper
        component="section"
        elevation={0}
        sx={{ pt: 7, pb: 8, backgroundColor: "#e5e5e5" }}
      >
        <Box sx={{ maxWidth: "70vw", marginX: "auto", mt: 1 }}>
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
              sx={{ backgroundColor: "#fff", mr: 3 }}
            />
            <TextField
              required
              id="rent-date"
              label="租借日期"
              variant="outlined"
              sx={{ backgroundColor: "#fff", mr: 3 }}
            />
            <TextField
              required
              id="rent-reason"
              label="租借事由"
              variant="outlined"
              sx={{ backgroundColor: "#fff", mr: 3 }}
            />
            <SearchIcon
              fontSize="large"
              color="secondary"
              sx={{ color: "#757070", cursor: "pointer" }}
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
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ display: "flex", mr: 2 }}>
                  <CropDinIcon fontSize="large" color="primary" />
                  <Typography variant="subtitle3">可預約</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CropDinIcon fontSize="large" color="other" />
                  <Typography variant="subtitle3">不可預約</Typography>
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
                mr: 1,
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
                ml: 1,
              }}
              variant="outlined"
              endIcon={<ArrowForwardIosIcon />}
            >
              <small>後一周</small>
            </Button>
          </Grid>
          <Box
            component="main"
            sx={{ backgroundColor: "#b8aeae", px: 5, py: 5, mb: 5 }}
          >
            <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
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
                    {columnsDate.map((column) => (
                      <TableCell
                        key={column.date}
                        align="center"
                        sx={{ borderRight: "1px solid #e5e5e5" }}
                      >
                        {column.date}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    {dayWeek.map((week) => (
                      <TableCell
                        key={week.weekday}
                        align="center"
                        sx={{ borderRight: "1px solid #e5e5e5" }}
                      >
                        {week.weekday}
                      </TableCell>
                    ))}
                    {/* <TableCell
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
                </TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {select_locationData.map((data) => (
                    <Fragment key={data.location}>
                      <TableRow>
                        <TableCell
                          rowSpan={3}
                          align="center"
                          sx={{ borderRight: "1px solid #e5e5e5" }}
                        >
                          {data.location}
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
                        {data.morning.map((isChecked, index) => (
                          <TableCell
                            key={index}
                            align="center"
                            sx={{
                              borderRight: "1px solid #e5e5e5",
                              px: 0,
                              py: 0,
                            }}
                          >
                            <Checkbox
                              checked={isChecked}
                              sx={{
                                "& .MuiSvgIcon-root": {
                                  fontSize: "30px",
                                },
                              }}
                            />
                          </TableCell>
                        ))}
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
                        {data.noon.map((isChecked, index) => (
                          <TableCell
                            key={index}
                            align="center"
                            sx={{
                              borderRight: "1px solid #e5e5e5",
                              px: 0,
                              py: 0,
                            }}
                          >
                            <Checkbox
                              checked={isChecked}
                              sx={{
                                "& .MuiSvgIcon-root": {
                                  fontSize: "30px",
                                },
                              }}
                            />
                          </TableCell>
                        ))}
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
                        {data.night.map((isChecked, index) => (
                          <TableCell
                            key={index}
                            align="center"
                            sx={{
                              borderRight: "1px solid #e5e5e5",
                              px: 0,
                              py: 0,
                            }}
                          >
                            <Checkbox
                              checked={isChecked}
                              sx={{
                                "& .MuiSvgIcon-root": {
                                  fontSize: "30px",
                                },
                              }}
                            />
                          </TableCell>
                        ))}
                      </TableRow>
                    </Fragment>
                  ))}
                  {/* <TableRow>
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
                        sx={{
                          "& .MuiSvgIcon-root": {
                            fontSize: "30px",
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
                    >
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
                  </TableRow> */}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              其他場地推薦
            </Typography>
            {/* here */}
            {select_locationData.map((data) => (
              <Fragment key={data.location}>
                <Box
                  component="main"
                  sx={{ backgroundColor: "#b8aeae", px: 4, py: 4, mb: 4 }}
                >
                  <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
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
                          {columnsDate.map((column) => (
                            <TableCell
                              key={column.date}
                              align="center"
                              sx={{ borderRight: "1px solid #e5e5e5" }}
                            >
                              {column.date}
                            </TableCell>
                          ))}
                        </TableRow>
                        <TableRow>
                          {dayWeek.map((week) => (
                            <TableCell
                              key={week.weekday}
                              align="center"
                              sx={{ borderRight: "1px solid #e5e5e5" }}
                            >
                              {week.weekday}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell
                            rowSpan={3}
                            align="center"
                            sx={{ borderRight: "1px solid #e5e5e5" }}
                          >
                            {data.location}
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
                          {data.morning.map((isChecked, index) => (
                            <TableCell
                              key={index}
                              align="center"
                              sx={{
                                borderRight: "1px solid #e5e5e5",
                                px: 0,
                                py: 0,
                              }}
                            >
                              <Checkbox
                                checked={isChecked}
                                sx={{
                                  "& .MuiSvgIcon-root": {
                                    fontSize: "30px",
                                  },
                                }}
                              />
                            </TableCell>
                          ))}
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
                          {data.noon.map((isChecked, index) => (
                            <TableCell
                              key={index}
                              align="center"
                              sx={{
                                borderRight: "1px solid #e5e5e5",
                                px: 0,
                                py: 0,
                              }}
                            >
                              <Checkbox
                                checked={isChecked}
                                sx={{
                                  "& .MuiSvgIcon-root": {
                                    fontSize: "30px",
                                  },
                                }}
                              />
                            </TableCell>
                          ))}
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
                          {data.night.map((isChecked, index) => (
                            <TableCell
                              key={index}
                              align="center"
                              sx={{
                                borderRight: "1px solid #e5e5e5",
                                px: 0,
                                py: 0,
                              }}
                            >
                              <Checkbox
                                checked={isChecked}
                                sx={{
                                  "& .MuiSvgIcon-root": {
                                    fontSize: "30px",
                                  },
                                }}
                              />
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Fragment>
            ))}
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export default RoomReserve;
