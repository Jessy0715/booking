import { useState, useEffect, memo, Fragment } from "react";
import Header from "@/components/Header";
import RentCalendar from "@/components/rentCalendar";
import { Paper, Grid, Typography, Button, Box } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Modal, ConfigProvider, Input, Select, Space, Flex } from "antd";

const RoomReserve = () => {
  const modalStyles = {
    header: {
      borderLeft: `5px solid #938C8C`,
      borderRadius: 0,
      paddingInlineStart: 5,
    },
  };
  const [rentSpace, setRentSpace] = useState(null);
  const [rentReason, setReason] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRentSpaceChange = (value) => {
    setRentSpace(value);
  };
  const handleRentReasonChange = (event) => {
    setReason(event.target.value);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // 查詢館藏
  const searchRoom = () => {
    // api.searchRoom(rentSpace, rentDate, rentReason).then((response) => { ... });
  };

  // 立即預約
  const reserveRoomASAP = () => {
    setIsModalOpen(true);
  };

  // useEffect();

  return (
    <>
      <Header />
      <Paper
        component="section"
        elevation={0}
        sx={{ pt: 7, pb: 8, backgroundColor: "#e5e5e5" }}
      >
        <Box sx={{ maxWidth: "80vw", marginX: "auto", mt: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              mb: 3,
            }}
          >
            <Box>
              <Typography variant="subtitle2">預約時段說明:</Typography>
              <Typography variant="subtitle2">
                上午 08:00~12:00 / 下午 13:00~17:00 / 晚上 18:00~22:00
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              mb: 3,
            }}
          >
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 2 }}
            >
              <Grid item>
                <Grid container direction="row" alignItems="center">
                  <ArrowRightIcon fontSize="large" color="primary" />
                  <Typography variant="subtitle1">租借場地時段表</Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={reserveRoomASAP}>
                  <span>立即預約</span>
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Box>
            <RentCalendar />
          </Box>
        </Box>
      </Paper>

      <ConfigProvider
        modal={{
          styles: modalStyles,
        }}
      >
        <Modal
          title="預約填寫單"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="確定"
          cancelText="取消"
          okButtonProps={{ style: { backgroundColor: "#938C8C" } }}
        >
          <Flex gap="middle">
            <Select
              style={{ width: "100%", marginTop: "10px", marginBottom: "10px" }}
              placeholder="請選擇租借場地"
              value={rentSpace}
              allowClear
              onChange={handleRentSpaceChange}
              options={[
                {
                  value: "101館",
                  label: "101館",
                },
                {
                  value: "102館",
                  label: "102館",
                },
                {
                  value: "103館",
                  label: "103館",
                },
              ]}
            />
            <Input
              style={{ width: "100%", marginTop: "10px", marginBottom: "10px" }}
              placeholder="請輸入租借事由"
              allowClear
              value={rentReason}
              onChange={handleRentReasonChange}
            />
          </Flex>
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default RoomReserve;
