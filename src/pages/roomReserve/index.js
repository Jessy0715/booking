import { useState, useEffect, memo, Fragment } from "react";
import dayjs from "dayjs";
import Header from "@/components/Header";
import {
  Paper,
  Grid,
  TextField,
  Divider,
  Typography,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
  const initialChecklist = [
    { checked: false, disabled: false },
    { checked: false, disabled: true },
    { checked: true, disabled: false },
    { checked: false, disabled: false },
    { checked: true, disabled: true },
  ];

  const [checkedList, setCheckedList] = useState(initialChecklist);

  const handleChange = (index, type) => (event) => {
    console.log(index, type, event.target.checked);
    const updatedCheckedList = checkedList.map(
      (item, i) => {
        if (index === i) {
          console.log(index);
          return { ...item, checked: event.target.checked };
        } else {
          return item;
        }
      }
      // index === i ? { ...item, checked: event.target.checked } : item
    );
    setCheckedList(updatedCheckedList);
  };

  //  ======================

  const [columnsDate, setColumnsDate] = useState(() => {
    const currentDate = dayjs();
    const startOfWeek = currentDate.startOf("week");
    const endOfWeek = currentDate.endOf("week");
    const dates = [];
    let currentDay = startOfWeek;
    while (
      currentDay.isBefore(endOfWeek, "day") ||
      currentDay.isSame(endOfWeek, "day")
    ) {
      dates.push(currentDay);
      currentDay = currentDay.add(1, "day");
    }
    return dates;
  });
  const dayNames = ["日", "一", "二", "三", "四", "五", "六"];
  const columnsDay = columnsDate.map((column) => dayNames[column.day()]);

  const select_locationData = [
    {
      location: "普 101",
      checked: {
        morning: [
          {
            date: columnsDate[0],
            isCheck: false,
            disabled: false,
          },
          {
            date: columnsDate[1],
            isCheck: false,
            disabled: false,
          },
          {
            date: columnsDate[2],
            isCheck: false,
            disabled: false,
          },
          {
            date: columnsDate[3],
            isCheck: false,
            disabled: false,
          },
          {
            date: columnsDate[4],
            isCheck: false,
            disabled: false,
          },
          {
            date: columnsDate[5],
            isCheck: false,
            disabled: false,
          },
          {
            date: columnsDate[6],
            isCheck: false,
            disabled: false,
          },
        ],
        noon: [
          {
            date: columnsDate[0],
            isCheck: false,
            disabled: false,
          },
          {
            date: columnsDate[1],
            isCheck: false,
            disabled: false,
          },
          {
            date: columnsDate[2],
            isCheck: false,
            disabled: false,
          },
          {
            date: columnsDate[3],
            isCheck: false,
            disabled: false,
          },
          {
            date: columnsDate[4],
            isCheck: false,
            disabled: false,
          },
          {
            date: columnsDate[5],
            isCheck: false,
            disabled: false,
          },
          {
            date: columnsDate[6],
            isCheck: false,
            disabled: false,
          },
        ],
        night: [
          {
            date: columnsDate[0],
            isCheck: false,
            disabled: false,
          },
          {
            date: columnsDate[1],
            isCheck: false,
            disabled: false,
          },
          {
            date: columnsDate[2],
            isCheck: false,
            disabled: false,
          },
          {
            date: columnsDate[3],
            isCheck: false,
            disabled: false,
          },
          {
            date: columnsDate[4],
            isCheck: false,
            disabled: false,
          },
          {
            date: columnsDate[5],
            isCheck: false,
            disabled: false,
          },
          {
            date: columnsDate[6],
            isCheck: false,
            disabled: false,
          },
        ],
      },
    },
  ];

  const [locationsData, setLocationsData] = useState(select_locationData);

  const [rentType, setRentType] = useState("");
  const [rentDate, setRentDate] = useState("");
  const [rentReason, setReason] = useState("");
  const handleTest = (timePeriod, location, index) => (event) => {
    // console.log(timePeriod, location, index, event.target.checked);

    const updatedCheckedList = locationsData.map((item, i) => {
      if (
        location === item.location &&
        timePeriod === item.checked[timePeriod] &&
        index === i
      ) {
        const updatedChecked = [...item.checked[timePeriod]];
        updatedChecked[index]["isCheck"] = event.target.checked;
        console.log(updatedChecked[index]["isCheck"]);
        return {
          ...item,
          checked: {
            ...item.checked,
            [timePeriod]: updatedChecked,
          },
        };
      }
      // console.log(item);
      return item;
    });
    setLocationsData(updatedCheckedList);
  };

  const handleCheckboxChange = (timePeriod, location, index) => (event) => {
    console.log("called::", timePeriod, location, index, event.target.checked);
    const updatedLocationsData = locationsData.map((data) => {
      if (data.location == location) {
        const updatedChecked = [...data.checked[timePeriod]];
        updatedChecked[index]["isCheck"] = event.target.checked;
        return {
          ...data,
          checked: {
            ...data.checked,
            [timePeriod]: updatedChecked,
          },
        };
      }
      return data;
    });

    setLocationsData(updatedLocationsData);
  };

  const handleRentTypeChange = (event) => {
    setRentType(event.target.value);
  };
  const handleRentDateChange = (event) => {
    setRentDate(event.target.value);
  };
  const handleRentReasonChange = (event) => {
    setReason(event.target.value);
  };

  // 前一周
  const handlePreviousWeek = () => {
    const newStartDate = columnsDate[0].subtract(1, "week");
    const newEndDate = newStartDate.add(6, "day");
    const newDates = [];

    let currentDay = newStartDate;
    while (
      currentDay.isBefore(newEndDate, "day") ||
      currentDay.isSame(newEndDate, "day")
    ) {
      newDates.push(currentDay);
      currentDay = currentDay.add(1, "day");
    }

    setColumnsDate(newDates);
  };

  // 後一周
  const handleNextWeek = () => {
    const newStartDate = columnsDate[0].add(1, "week");
    const newEndDate = newStartDate.add(6, "day");
    const newDates = [];

    let currentDay = newStartDate;
    while (
      currentDay.isBefore(newEndDate, "day") ||
      currentDay.isSame(newEndDate, "day")
    ) {
      newDates.push(currentDay);
      currentDay = currentDay.add(1, "day");
    }

    setColumnsDate(newDates);
  };

  // 查詢館藏
  const searchRoom = () => {
    // api.searchRoom(rentType, rentDate, rentReason).then((response) => { ... });
  };

  // 立即預約
  const reserveRoomASAP = () => {};

  useEffect(() => {
    // console.log(">>>:", locationsData);
  }, [locationsData]);

  return (
    <>
      <Header />
      <Paper
        component="section"
        elevation={0}
        sx={{ pt: 7, pb: 8, backgroundColor: "#e5e5e5" }}
      >
        {checkedList.map((item, index) => (
          <Checkbox
            key={index}
            checked={item.checked}
            disabled={item.disabled}
            onChange={handleChange(index, "noon")}
          />
        ))}
        <Box sx={{ maxWidth: "70vw", marginX: "auto", mt: 1 }}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ mb: 4 }}
          >
            <FormControl
              sx={{ m: 1, width: "30%", mt: 0, mb: 0, mr: 3, ml: 0 }}
              variant="outlined"
              required
            >
              <InputLabel id="demo-simple-select-label">租借館別</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={rentType}
                label="租借館別"
                sx={{
                  backgroundColor: "white",
                }}
                onChange={handleRentTypeChange}
              >
                <MenuItem value={101}>101館</MenuItem>
                <MenuItem value={102}>102館</MenuItem>
                <MenuItem value={103}>103館</MenuItem>
              </Select>
            </FormControl>
            <TextField
              required
              id="rent-date"
              label="租借日期"
              variant="outlined"
              sx={{ backgroundColor: "#fff", mr: 3 }}
              value={rentDate}
              onChange={handleRentDateChange}
            />
            <TextField
              required
              id="rent-reason"
              label="租借事由"
              variant="outlined"
              sx={{ backgroundColor: "#fff", mr: 3 }}
              value={rentReason}
              onChange={handleRentReasonChange}
            />
            <SearchIcon
              fontSize="large"
              color="secondary"
              sx={{ color: "#757070", cursor: "pointer" }}
              onClick={searchRoom}
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
            <Button variant="contained" onClick={reserveRoomASAP}>
              立即預約
            </Button>
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
              onClick={handlePreviousWeek}
            >
              <small>前一周</small>
            </Button>
            <Box sx={{ color: "#938C8C" }}>
              <span>
                {columnsDate[0].format("YYYY年 MM月 DD日")} -{" "}
                {columnsDate[6].format("YYYY年 MM月 DD日")}
              </span>
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
              onClick={handleNextWeek}
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
                    {columnsDate.map((column, index) => (
                      <TableCell
                        key={column.format("YYYY-MM-DD")}
                        align="center"
                        sx={{ borderRight: "1px solid #e5e5e5" }}
                      >
                        {column.format("MM/DD")}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    {columnsDate.map((column, index) => (
                      <TableCell
                        key={column.format("YYYY-MM-DD")}
                        align="center"
                        sx={{ borderRight: "1px solid #e5e5e5" }}
                      >
                        {columnsDay[index]}
                      </TableCell>
                    ))}
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
                        {data.checked.morning.map((el, index) => (
                          <TableCell
                            key={index}
                            align="center"
                            sx={{
                              borderRight: "1px solid #e5e5e5",
                              px: 0,
                              py: 0,
                            }}
                          >
                            {/* <Checkbox
                              checked={el.isCheck}
                              disabled={el.disabled}
                              onChange={handleCheckboxChange(
                                "morning",
                                data.location,
                                index
                              )}
                              sx={{
                                "& .MuiSvgIcon-root": {
                                  fontSize: "30px",
                                },
                              }}
                            /> */}
                            <Checkbox
                              checked={el.isCheck}
                              disabled={el.disabled}
                              onChange={handleTest(
                                "morning",
                                data.location,
                                index
                              )}
                              sx={{
                                "& .MuiSvgIcon-root": {
                                  fontSize: "30px",
                                },
                              }}
                            />
                          </TableCell>
                        ))}
                      </TableRow>
                      {/* <TableRow>
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
                        {data.checked.noon.map((el, index) => (
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
                              checked={el.isCheck}
                              disabled={el.disabled}
                              onChange={(event) =>
                                handleCheckboxChange(
                                  "noon",
                                  data.location,
                                  index,
                                  event.target.checked,
                                  el.date
                                )
                              }
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
                        {data.checked.night.map((el, index) => (
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
                              checked={el.isCheck}
                              disabled={el.disabled}
                              onChange={(event) =>
                                handleCheckboxChange(
                                  "night",
                                  data.location,
                                  index,
                                  event.target.checked,
                                  el.date
                                )
                              }
                              sx={{
                                "& .MuiSvgIcon-root": {
                                  fontSize: "30px",
                                },
                              }}
                            />
                          </TableCell>
                        ))}
                      </TableRow> */}
                    </Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* <Box>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              其他場地推薦
            </Typography>
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
                              key={column.format("YYYY-MM-DD")}
                              align="center"
                              sx={{ borderRight: "1px solid #e5e5e5" }}
                            >
                              {column.format("MM/DD")}
                            </TableCell>
                          ))}
                        </TableRow>
                        <TableRow>
                          {columnsDate.map((column, index) => (
                            <TableCell
                              key={column.format("YYYY-MM-DD")}
                              align="center"
                              sx={{ borderRight: "1px solid #e5e5e5" }}
                            >
                              {columnsDay[index]}
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
          </Box> */}
        </Box>
      </Paper>
    </>
  );
};

export default RoomReserve;
