import Header from "@/components/Header";
import {
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../calendar.css";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useState } from "react";

const localizer = momentLocalizer(moment);
// console.log(localizer);

const events = [
  {
    title: "科學競技比賽",
    start: new Date(2024, 4, 1, 10, 0),
    end: new Date(2024, 4, 1, 12, 0),
  },
  {
    title: "籃球比賽",
    start: new Date(2024, 4, 1, 14, 0),
    end: new Date(2024, 4, 1, 16, 0),
  },
  {
    title: "科學玩實驗1",
    start: new Date(2024, 4, 13, 9, 0),
    end: new Date(2024, 4, 13, 11, 30),
  },
  {
    title: "科學玩實驗2",
    start: new Date(2024, 4, 13, 12, 0),
    end: new Date(2024, 4, 13, 14, 30),
  },
  {
    title: "科學玩實驗3",
    start: new Date(2024, 4, 13, 15, 0),
    end: new Date(2024, 4, 13, 16, 30),
  },
  {
    title: "科學玩實驗4",
    start: new Date(2024, 4, 13, 20, 0),
    end: new Date(2024, 4, 13, 21, 30),
  },
];
// 有調整成功，但整體畫面無效
const customDayPropGetter = (date) => {
  return {
    style: {
      height: "500px",
    },
  };
};
const calendarInfo = {
  id: 1,
  time: "09:00 - 13:00",
  activity: "科學競賽",
  name: "王小飛",
  place: "普101館",
};

const Admin = () => {
  const [open, setOpen] = useState(false);
  const handleEventSelect = (event) => {
    // console.log(event);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Header />
      <Paper component="section" elevation={0} sx={{ pt: 3, pb: 8 }}>
        <div style={{ width: "80vw", height: "600px", margin: "0 auto" }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ margin: "40px" }}
            selectable
            onSelectEvent={handleEventSelect}
          />
        </div>
      </Paper>
      <Dialog open={open} onClose={handleClose}>
        <Box sx={{ display: "block", height: "5px", background: "#938C8C" }} />
        <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
          <CalendarMonthIcon color="primary" style={{ fontSize: 28 }} />
        </DialogTitle>
        <Card sx={{ width: "20vw", display: "flex", justifyContent: "center" }}>
          <CardContent>
            <Typography sx={{ mb: 1 }} variant="body1" color="text.secondary">
              時間: {calendarInfo.time}
            </Typography>
            <Typography sx={{ mb: 1 }} variant="body1" color="text.secondary">
              活動: {calendarInfo.activity}
            </Typography>
            <Typography sx={{ mb: 1 }} variant="body1" color="text.secondary">
              借用人: {calendarInfo.name}
            </Typography>
            <Typography sx={{ mb: 1 }} variant="body1" color="text.secondary">
              地點: {calendarInfo.place}
            </Typography>
          </CardContent>
        </Card>
        <Box sx={{ display: "block", height: "5px", background: "#938C8C" }} />
      </Dialog>
    </>
  );
};

export default Admin;
