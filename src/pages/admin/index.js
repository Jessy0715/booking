import Header from "@/components/Header";
import {
  Box, Grid, TextField, Typography, InputAdornment,
  Button, TableContainer, Table, TableHead, TableBody,
  TableRow, TableCell, TableSortLabel, TablePagination,
  Checkbox, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle, Snackbar, Alert,
  Tabs, Tab,
} from "@mui/material";
import { useState, useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Tag } from "antd";

const API_URL = "http://localhost:3001";

const TIME_SLOT_LABEL = { morning: "上午", afternoon: "下午", night: "晚上" };
const STATUS_TAG = {
  pending:  { color: "orange", text: "審核中" },
  approved: { color: "green",  text: "已核准" },
  rejected: { color: "red",    text: "已拒絕" },
};

const EMPTY_FORM = {
  roomImg: "", title: "", desc: "",
  price: { morning: "", afternoon: "", night: "" },
};

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab]       = useState(0); // 0: 場地管理, 1: 預約審核
  const [filter, setFilter]             = useState("");
  const [rooms, setRooms]               = useState([]);
  const [bookings, setBookings]         = useState([]);
  const [isModalOpen, setIsModalOpen]   = useState(false);
  const [editingId, setEditingId]       = useState(null); // null = 新增, number = 編輯
  const [formValues, setFormValues]     = useState(EMPTY_FORM);
  const [selectedIds, setSelectedIds]   = useState([]);
  const [snackbar, setSnackbar]         = useState({ open: false, message: "", severity: "success" });

  // ─── 預約審核：搜尋 / 排序 / 分頁 ────────────────────────────────────
  const [bookingKeyword, setBookingKeyword] = useState("");
  const [bookingSort, setBookingSort]       = useState({ field: "date", direction: "asc" });
  const [bookingPage, setBookingPage]       = useState(0);
  const [bookingRowsPerPage, setBookingRowsPerPage] = useState(10);

  const TIME_SLOT_ORDER = { morning: 0, afternoon: 1, night: 2 };
  const STATUS_ORDER    = { pending: 0, approved: 1, rejected: 2 };

  const processedBookings = useMemo(() => {
    const kw = bookingKeyword.trim().toLowerCase();
    const filtered = kw
      ? bookings.filter((b) =>
          [b.roomTitle, b.userName, b.date, b.reason, STATUS_TAG[b.status]?.text]
            .some((v) => (v || "").toLowerCase().includes(kw))
        )
      : bookings;

    const { field, direction } = bookingSort;
    const sorted = [...filtered].sort((a, b) => {
      let va, vb;
      if (field === "timeSlot") {
        va = TIME_SLOT_ORDER[a.timeSlot] ?? 99;
        vb = TIME_SLOT_ORDER[b.timeSlot] ?? 99;
      } else if (field === "status") {
        va = STATUS_ORDER[a.status] ?? 99;
        vb = STATUS_ORDER[b.status] ?? 99;
      } else {
        va = (a[field] || "").toString();
        vb = (b[field] || "").toString();
      }
      if (va < vb) return direction === "asc" ? -1 : 1;
      if (va > vb) return direction === "asc" ?  1 : -1;
      return 0;
    });
    return sorted;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookings, bookingKeyword, bookingSort]);

  const handleBookingSort = (field) => {
    setBookingSort((prev) =>
      prev.field === field
        ? { field, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { field, direction: "asc" }
    );
    setBookingPage(0);
  };

  // ─── 通用提示 ────────────────────────────────────────────────────
  const showMsg = (message, severity = "success") =>
    setSnackbar({ open: true, message, severity });

  // ─── 取得場地列表 ────────────────────────────────────────────────
  const fetchRooms = async (keyword = "") => {
    const url = keyword
      ? `${API_URL}/api/rooms?pageSize=100&keyword=${encodeURIComponent(keyword)}`
      : `${API_URL}/api/rooms?pageSize=100`;
    const res  = await fetch(url);
    const json = await res.json();
    if (json.success) setRooms(json.data);
  };

  // ─── 取得預約列表 ────────────────────────────────────────────────
  const fetchBookings = async () => {
    const res  = await fetch(`${API_URL}/api/bookings`);
    const json = await res.json();
    if (json.success) setBookings(json.data);
  };

  useEffect(() => { fetchRooms(); }, []);
  useEffect(() => { if (activeTab === 1) fetchBookings(); }, [activeTab]);

  // ─── 場地 CRUD ───────────────────────────────────────────────────
  const handleOpenAdd = () => {
    setEditingId(null);
    setFormValues(EMPTY_FORM);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (room) => {
    setEditingId(room.id);
    setFormValues({
      roomImg: room.roomImg,
      title:   room.title,
      desc:    room.desc,
      price:   { ...room.price },
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!formValues.title) { showMsg("場地名稱為必填", "warning"); return; }

    const body = {
      roomImg: formValues.roomImg,
      title:   formValues.title,
      desc:    formValues.desc,
      price:   formValues.price,
    };

    const url    = editingId ? `${API_URL}/api/rooms/${editingId}` : `${API_URL}/api/rooms`;
    const method = editingId ? "PUT" : "POST";

    const res  = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = await res.json();

    if (json.success) {
      setIsModalOpen(false);
      fetchRooms(filter);
      showMsg(editingId ? "場地已更新" : "場地已新增");
    } else {
      showMsg(json.message || "操作失敗", "error");
    }
  };

  const handleDelete = async (id) => {
    const res  = await fetch(`${API_URL}/api/rooms/${id}`, { method: "DELETE" });
    const json = await res.json();
    if (json.success) { fetchRooms(filter); showMsg("場地已刪除"); }
    else showMsg(json.message || "刪除失敗", "error");
  };

  const handleBatchDelete = async () => {
    await Promise.all(selectedIds.map((id) =>
      fetch(`${API_URL}/api/rooms/${id}`, { method: "DELETE" })
    ));
    setSelectedIds([]);
    fetchRooms(filter);
    showMsg(`已刪除 ${selectedIds.length} 筆場地`);
  };

  // ─── 預約審核 ────────────────────────────────────────────────────
  const handleReview = async (id, status) => {
    const res  = await fetch(`${API_URL}/api/bookings/${id}`, {
      method:  "PATCH",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ status }),
    });
    const json = await res.json();
    if (json.success) {
      fetchBookings();
      showMsg(status === "approved" ? "已核准" : "已拒絕");
    } else {
      showMsg(json.message || "操作失敗", "error");
    }
  };

  // ─── 表單欄位變更 ─────────────────────────────────────────────────
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("price.")) {
      const key = name.split(".")[1];
      setFormValues((prev) => ({ ...prev, price: { ...prev.price, [key]: value } }));
    } else {
      setFormValues((prev) => ({ ...prev, [name]: value }));
    }
  };

  const toggleSelect = (id) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  return (
    <>
      <Header />
      <Box sx={{ maxWidth: "80vw", marginX: "auto", mt: 3, pr: 3 }}>

        {/* ─── 頁首 ─────────────────────────────────────────────── */}
        <Grid container direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
          <Grid item>
            <Grid container direction="row" alignItems="center">
              <ArrowRightIcon fontSize="large" color="primary" />
              <Typography variant="subtitle1">後台管理系統</Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Link to="/roomReserve">
              <span style={{ textDecoration: "underline" }}>前往月曆查看</span>
            </Link>
          </Grid>
        </Grid>

        {/* ─── Tabs ────────────────────────────────────────────── */}
        <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} sx={{ mb: 3 }}>
          <Tab label="場地管理" />
          <Tab label="預約審核" />
        </Tabs>

        {/* ════════ Tab 0：場地管理 ════════ */}
        {activeTab === 0 && (
          <>
            {/* 搜尋列 */}
            <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              <Grid container item xs={8} spacing={2} alignItems="center">
                <Grid item>
                  <TextField
                    label="搜尋" placeholder="請搜尋場地名稱"
                    variant="outlined" size="small" value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    InputProps={{ startAdornment: <InputAdornment position="start"><Search /></InputAdornment> }}
                  />
                </Grid>
                <Grid item>
                  <Button variant="contained" onClick={() => fetchRooms(filter)}>搜尋</Button>
                </Grid>
              </Grid>
              <Grid item>
                <Button variant="outlined" sx={{ mr: 2 }} onClick={handleOpenAdd}>新增</Button>
                <Button
                  variant="outlined"
                  disabled={selectedIds.length === 0}
                  onClick={handleBatchDelete}
                >
                  批次刪除 {selectedIds.length > 0 && `(${selectedIds.length})`}
                </Button>
              </Grid>
            </Grid>

            {/* 場地表格 */}
            <TableContainer sx={{ mt: 1 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    {["選擇", "場地照片", "場地名稱", "場地說明", "場地費用", "操作"].map((h) => (
                      <TableCell key={h}><strong>{h}</strong></TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rooms.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedIds.includes(row.id)}
                          onChange={() => toggleSelect(row.id)}
                        />
                      </TableCell>
                      <TableCell>
                        {row.roomImg && (
                          <img src={`${row.roomImg}&w=80`} alt={row.title} style={{ width: 60, height: 60, objectFit: "cover" }} />
                        )}
                      </TableCell>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.desc}</TableCell>
                      <TableCell>
                        <p>上午：NT$ {row.price.morning}</p>
                        <p>下午：NT$ {row.price.afternoon}</p>
                        <p>晚上：NT$ {row.price.night}</p>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ mb: 1 }}>
                          <Button size="small" variant="outlined" startIcon={<EditIcon />} onClick={() => handleOpenEdit(row)}>
                            編輯
                          </Button>
                        </Box>
                        <Box>
                          <Button size="small" variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleDelete(row.id)}>
                            刪除
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}

        {/* ════════ Tab 1：預約審核 ════════ */}
        {activeTab === 1 && (
          <>
            {/* 搜尋列 */}
            <Box sx={{ mb: 2 }}>
              <TextField
                size="small"
                placeholder="搜尋場地、預約人、日期、事由、狀態…"
                value={bookingKeyword}
                onChange={(e) => { setBookingKeyword(e.target.value); setBookingPage(0); }}
                InputProps={{ startAdornment: <InputAdornment position="start"><Search /></InputAdornment> }}
                sx={{ width: 340 }}
              />
            </Box>

            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    {[
                      { key: "roomTitle", label: "場地" },
                      { key: "date",      label: "日期" },
                      { key: "timeSlot",  label: "時段" },
                      { key: "userName",  label: "預約人" },
                      { key: null,        label: "事由" },
                      { key: "status",    label: "狀態" },
                      { key: null,        label: "操作" },
                    ].map(({ key, label }) => (
                      <TableCell key={label}>
                        {key ? (
                          <TableSortLabel
                            active={bookingSort.field === key}
                            direction={bookingSort.field === key ? bookingSort.direction : "asc"}
                            onClick={() => handleBookingSort(key)}
                          >
                            <strong>{label}</strong>
                          </TableSortLabel>
                        ) : (
                          <strong>{label}</strong>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {processedBookings
                    .slice(bookingPage * bookingRowsPerPage, bookingPage * bookingRowsPerPage + bookingRowsPerPage)
                    .map((b) => (
                      <TableRow key={b.id} hover>
                        <TableCell>{b.roomTitle || "--"}</TableCell>
                        <TableCell>{b.date}</TableCell>
                        <TableCell>{TIME_SLOT_LABEL[b.timeSlot]}</TableCell>
                        <TableCell>{b.userName}</TableCell>
                        <TableCell sx={{ maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {b.reason || "--"}
                        </TableCell>
                        <TableCell>
                          <Tag color={STATUS_TAG[b.status]?.color}>
                            {STATUS_TAG[b.status]?.text}
                          </Tag>
                        </TableCell>
                        <TableCell>
                          {b.status === "pending" && (
                            <Box sx={{ display: "flex", gap: 1 }}>
                              <Button
                                size="small" variant="contained"
                                startIcon={<CheckCircleOutlineIcon />}
                                sx={{ backgroundColor: "#4caf50", "&:hover": { backgroundColor: "#388e3c" } }}
                                onClick={() => handleReview(b.id, "approved")}
                              >
                                核准
                              </Button>
                              <Button
                                size="small" variant="outlined" color="error"
                                startIcon={<CancelOutlinedIcon />}
                                onClick={() => handleReview(b.id, "rejected")}
                              >
                                拒絕
                              </Button>
                            </Box>
                          )}
                          {b.status !== "pending" && (
                            <span style={{ color: "#aaa", fontSize: "13px" }}>已審核</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  {processedBookings.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} align="center" sx={{ color: "#aaa", py: 4 }}>
                        {bookingKeyword ? "查無符合的預約紀錄" : "目前無預約申請"}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              component="div"
              count={processedBookings.length}
              page={bookingPage}
              onPageChange={(_, newPage) => setBookingPage(newPage)}
              rowsPerPage={bookingRowsPerPage}
              onRowsPerPageChange={(e) => { setBookingRowsPerPage(parseInt(e.target.value, 10)); setBookingPage(0); }}
              rowsPerPageOptions={[5, 10, 25]}
              labelRowsPerPage="每頁筆數："
              labelDisplayedRows={({ from, to, count }) => `第 ${from}–${to} 筆，共 ${count} 筆`}
            />
          </>
        )}
      </Box>

      {/* ─── 新增 / 編輯場地 Dialog ───────────────────────────────── */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingId ? "編輯場地" : "新增場地"}</DialogTitle>
        <DialogContent>
          <DialogContentText component="div">
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
              <TextField size="small" label="場地圖片 URL" name="roomImg"
                value={formValues.roomImg} onChange={handleFormChange} fullWidth />
              {formValues.roomImg && (
                <img src={formValues.roomImg} alt="預覽" style={{ width: "100%", maxHeight: 160, objectFit: "cover", borderRadius: 4 }} />
              )}
              <TextField size="small" label="場地名稱 *" name="title"
                value={formValues.title} onChange={handleFormChange} fullWidth />
              <TextField size="small" label="場地說明" name="desc"
                value={formValues.desc} onChange={handleFormChange} fullWidth />
              <Typography variant="body2" color="text.secondary">場地費用（NT$）</Typography>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <TextField size="small" type="number" label="上午" name="price.morning"
                    value={formValues.price.morning} onChange={handleFormChange} fullWidth />
                </Grid>
                <Grid item xs={4}>
                  <TextField size="small" type="number" label="下午" name="price.afternoon"
                    value={formValues.price.afternoon} onChange={handleFormChange} fullWidth />
                </Grid>
                <Grid item xs={4}>
                  <TextField size="small" type="number" label="晚上" name="price.night"
                    value={formValues.price.night} onChange={handleFormChange} fullWidth />
                </Grid>
              </Grid>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button size="small" onClick={() => setIsModalOpen(false)} variant="outlined">取消</Button>
          <Button size="small" onClick={handleSave} variant="contained">儲存</Button>
        </DialogActions>
      </Dialog>

      {/* ─── 全域提示 ─────────────────────────────────────────────── */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
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

export default Admin;
