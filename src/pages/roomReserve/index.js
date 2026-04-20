import { useState, useEffect } from "react";
import Header from "@/components/Header";
import RentCalendar from "@/components/rentCalendar";
import {
  Paper,
  Grid,
  Typography,
  Button,
  Box,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import {
  Modal,
  ConfigProvider,
  Input,
  Select,
  DatePicker,
  Form,
  message,
} from "antd";
import dayjs from "dayjs";
import { useNavigate, useLocation } from "react-router-dom";

const API_URL = "http://localhost:3001";

const TIME_SLOT_OPTIONS = [
  { value: "morning",   label: "上午 09:00 - 12:00" },
  { value: "afternoon", label: "下午 13:00 - 17:00" },
  { value: "night",     label: "晚上 18:00 - 22:00" },
];

const RoomReserve = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();
  const isAdmin = JSON.parse(localStorage.getItem("user") || "{}").role === "admin";

  const modalStyles = {
    header: {
      borderLeft: `5px solid #938C8C`,
      borderRadius: 0,
      paddingInlineStart: 5,
    },
  };

  const [isModalOpen, setIsModalOpen]       = useState(false);
  const [rooms, setRooms]                   = useState([]);
  const [submitting, setSubmitting]         = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [snackbar, setSnackbar]             = useState({ open: false, message: "", severity: "success" });
  // 所有預約快取（初始化時拉取，新增後更新）
  const [allBookings, setAllBookings]       = useState([]);
  // 目前表單選擇的場地與日期（用 state 追蹤，不靠 form.getFieldValue 避免 timing 問題）
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [selectedDate, setSelectedDate]     = useState(null); // YYYY-MM-DD string

  // ─── 取得所有預約（用於 client-side 時段衝突判斷） ────────────────
  useEffect(() => {
    fetch(`${API_URL}/api/bookings`)
      .then((res) => res.json())
      .then((json) => { if (json.success) setAllBookings(json.data); })
      .catch(() => {});
  }, [refreshTrigger]); // 新增預約後重拉

  // ─── 取得場地清單 ─────────────────────────────────────────────
  useEffect(() => {
    fetch(`${API_URL}/api/rooms?pageSize=100`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setRooms(json.data.map((r) => ({ value: r.id, label: r.title })));
          const roomId = location.state?.roomId;
          if (roomId) {
            form.setFieldsValue({ roomId });
            setSelectedRoomId(roomId);
            setIsModalOpen(true);
          }
        }
      })
      .catch(() => message.error("無法載入場地清單"));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Client-side 時段狀態計算 ─────────────────────────────────
  // 回傳 { morning: 'available'|'pending'|'approved', afternoon: ..., night: ... }
  const computeSlotStatus = () => {
    if (!selectedRoomId || !selectedDate) return {};
    const result = {};
    for (const slot of ["morning", "afternoon", "night"]) {
      const conflict = allBookings.find(
        (b) =>
          b.roomId   === selectedRoomId &&
          b.date     === selectedDate   &&
          b.timeSlot === slot           &&
          (b.status === "pending" || b.status === "approved")
      );
      result[slot] = conflict ? conflict.status : "available";
    }
    return result;
  };
  const slotStatus = computeSlotStatus();

  // ─── 場地 Select 變動 ─────────────────────────────────────────
  const handleRoomChange = (value) => {
    setSelectedRoomId(value || null);
    form.setFieldValue("timeSlot", undefined);
  };

  // ─── 日期 DatePicker 變動 ────────────────────────────────────
  const handleDateChange = (value) => {
    setSelectedDate(value ? value.format("YYYY-MM-DD") : null);
    form.setFieldValue("timeSlot", undefined);
  };

  // ─── 點擊月曆日期 → 預填日期並開啟 Modal ────────────────────────
  const handleDateClick = (dateStr) => {
    form.setFieldsValue({ date: dayjs(dateStr) });
    setSelectedDate(dateStr);
    // 若從精選空間帶入了 roomId，同步更新 selectedRoomId
    const currentRoomId = form.getFieldValue("roomId");
    if (currentRoomId) setSelectedRoomId(currentRoomId);
    form.setFieldValue("timeSlot", undefined);
    setIsModalOpen(true);
  };

  // ─── 立即預約按鈕 ─────────────────────────────────────────────
  const openModal = () => {
    form.resetFields();
    setSelectedRoomId(null);
    setSelectedDate(null);
    setIsModalOpen(true);
  };

  // ─── 送出預約 ────────────────────────────────────────────────
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setSubmitting(true);

      const payload = {
        roomId:   values.roomId,
        userName: values.userName,
        date:     values.date.format("YYYY-MM-DD"),
        timeSlot: values.timeSlot,
        reason:   values.reason || "",
      };

      const res  = await fetch(`${API_URL}/api/bookings`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      });
      const json = await res.json();

      if (json.success) {
        setIsModalOpen(false);
        form.resetFields();
        setRefreshTrigger((n) => n + 1); // 通知月曆重新拉資料
        setSnackbar({ open: true, message: "預約送出成功！等待審核中。", severity: "success" });
      } else {
        setSnackbar({ open: true, message: json.message || "預約失敗", severity: "error" });
      }
    } catch (err) {
      // validateFields 錯誤不需額外處理（表單會顯示紅字）
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <Paper
        component="section"
        elevation={0}
        sx={{ pt: 7, pb: 8, backgroundColor: "#e5e5e5" }}
      >
        <Box sx={{ maxWidth: "80vw", marginX: "auto", mt: 1 }}>

          {/* ─── 返回箭頭 ──────────────────────────────────────── */}
          <Box sx={{ mb: 1 }}>
            <IconButton onClick={() => navigate(-1)} size="small">
              <ArrowBackIcon fontSize="small" />
            </IconButton>
            <Typography
              component="span"
              variant="caption"
              sx={{ ml: 0.5, color: "text.secondary", cursor: "pointer" }}
              onClick={() => navigate(-1)}
            >
              返回
            </Typography>
          </Box>

          {/* ─── 標題 + 立即預約按鈕 ───────────────────────────── */}
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
              <Button variant="contained" onClick={openModal}>
                立即預約
              </Button>
            </Grid>
          </Grid>

          {/* ─── 圖例說明（僅後台顯示） ────────────────────────── */}
          {isAdmin && (
            <Box sx={{ display: "flex", gap: 3, mb: 2, fontSize: "13px", color: "#666" }}>
              <span>🟡 審核中</span>
              <span>🟢 已核准</span>
              <span>🔴 已拒絕</span>
            </Box>
          )}

          {/* ─── 月曆 ──────────────────────────────────────────── */}
          <Box>
            <RentCalendar
              onDateClick={handleDateClick}
              refreshTrigger={refreshTrigger}
            />
          </Box>
        </Box>
      </Paper>

      {/* ─── 預約填寫 Modal ────────────────────────────────────── */}
      <ConfigProvider modal={{ styles: modalStyles }}>
        <Modal
          title="預約填寫單"
          open={isModalOpen}
          onOk={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
          okText="確認送出"
          cancelText="取消"
          confirmLoading={submitting}
          okButtonProps={{ style: { backgroundColor: "#938C8C", borderColor: "#938C8C" } }}
          width={480}
        >
          <Form
            form={form}
            layout="vertical"
            style={{ marginTop: "16px" }}
          >
            <Form.Item
              label="預約場地"
              name="roomId"
              rules={[{ required: true, message: "請選擇場地" }]}
            >
              <Select
                placeholder="請選擇租借場地"
                allowClear
                options={rooms}
                onChange={handleRoomChange}
              />
            </Form.Item>

            <Form.Item
              label="預約日期"
              name="date"
              rules={[{ required: true, message: "請選擇日期" }]}
            >
              <DatePicker
                style={{ width: "100%" }}
                placeholder="請選擇日期"
                disabledDate={(d) => d.isBefore(dayjs(), "day")}
                format="YYYY-MM-DD"
                onChange={handleDateChange}
              />
            </Form.Item>

            <Form.Item
              label="租借時段"
              name="timeSlot"
              rules={[{ required: true, message: "請選擇時段" }]}
            >
              <Select
                placeholder={
                  !selectedRoomId || !selectedDate
                    ? "請先選擇場地與日期"
                    : "請選擇時段"
                }
                options={TIME_SLOT_OPTIONS.map((opt) => {
                  const status = slotStatus[opt.value];
                  const taken  = status === "pending" || status === "approved";
                  const suffix = status === "approved" ? " （已核准，無法預約）"
                               : status === "pending"  ? " （申請中，無法預約）"
                               : "";
                  return {
                    value:    opt.value,
                    label:    `${opt.label}${suffix}`,
                    disabled: taken,
                  };
                })}
              />
            </Form.Item>

            <Form.Item
              label="預約人姓名"
              name="userName"
              rules={[{ required: true, message: "請輸入姓名" }]}
            >
              <Input placeholder="請輸入預約人姓名" allowClear />
            </Form.Item>

            <Form.Item label="租借事由" name="reason">
              <Input placeholder="請輸入租借事由（選填）" allowClear />
            </Form.Item>
          </Form>
        </Modal>
      </ConfigProvider>

      {/* ─── 送出結果提示 ──────────────────────────────────────── */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar((s) => ({ ...s, open: false }))}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default RoomReserve;
