import { useState, useEffect } from "react";
import {
  Paper,
  Grid,
  Typography,
  Box,
  Button,
  Pagination,
  PaginationItem,
  Chip,
  Skeleton,
  Alert,
} from "@mui/material";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import GroupIcon from "@mui/icons-material/Group";
import { useStyles } from "../../../bookingStyle";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import RoomTable from "./RoomTable";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3001";
const PAGE_SIZE = 5;

const Room = () => {
  const navigate = useNavigate();
  const classes = useStyles();

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `${API_URL}/api/rooms?page=${currentPage}&pageSize=${PAGE_SIZE}`
        );
        const json = await res.json();
        if (!json.success) throw new Error("取得場地失敗");
        setRooms(json.data);
        setTotalPages(json.pagination.totalPages);
      } catch (err) {
        setError("無法連線至伺服器，請確認後端是否啟動。");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [currentPage]);

  const handlePageChange = (_ev, page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPageItem = (item) => (
    <PaginationItem
      component="div"
      style={{ backgroundColor: item.page === currentPage ? "#938C8C" : "#fff" }}
      {...item}
    />
  );

  // ─── 載入中骨架屏 ───────────────────────────────────────────────
  if (loading) {
    return (
      <Paper component="main" elevation={0} sx={{ backgroundColor: "#E5E5E5", p: 3 }}>
        {[1, 2, 3].map((i) => (
          <Paper key={i} elevation={0} sx={{ mb: 3, p: 3, minWidth: "80vw", marginX: "auto" }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Skeleton variant="rectangular" height={200} />
              </Grid>
              <Grid item xs={8}>
                <Skeleton variant="text" width="40%" height={32} />
                <Skeleton variant="text" width="80%" />
                <Skeleton variant="rectangular" height={80} sx={{ mt: 2 }} />
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Paper>
    );
  }

  // ─── 錯誤提示 ───────────────────────────────────────────────────
  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <>
      <Paper component="main" elevation={0} sx={{ backgroundColor: "#E5E5E5" }}>
        <Grid container direction="column" justifyContent="flex-start">
          {rooms.map((room) => {
            const { id, roomImg, title, desc, price, floor, area, capacity, facilities } = room;
            return (
              <Paper
                key={id}
                elevation={0}
                component="section"
                square
                sx={{
                  mb: 5,
                  minWidth: "80vw",
                  marginX: "auto",
                  backgroundColor: "#fff",
                  p: 3,
                }}
              >
                <Grid container direction="row" wrap="nowrap">
                  {/* ─── 場地圖片 ─────────────────────────────── */}
                  <Grid item xs={4}>
                    <Box
                      sx={{
                        backgroundImage: `url(${roomImg})`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        width: "95%",
                        height: "200px",
                        borderRadius: 1,
                      }}
                    />
                  </Grid>

                  {/* ─── 場地資訊 ─────────────────────────────── */}
                  <Grid item xs={8}>
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-start"
                    >
                      <Box sx={{ flex: 1 }}>
                        {/* 標題 */}
                        <Grid container alignItems="center">
                          <ArrowRightIcon fontSize="large" color="secondary" />
                          <Typography variant="subtitle2" fontWeight="bold">
                            {title}
                          </Typography>
                        </Grid>

                        {/* 描述 */}
                        <Box sx={{ fontSize: "14px", color: "#555" }} className={classes.pd}>
                          {desc}
                        </Box>

                        {/* 空間資訊 */}
                        <Grid container spacing={2} sx={{ mt: 1, mb: 1 }} alignItems="center">
                          <Grid item>
                            <Grid container alignItems="center" spacing={0.5}>
                              <Grid item><MeetingRoomIcon fontSize="small" sx={{ color: "#8b7355" }} /></Grid>
                              <Grid item><Typography variant="caption" color="text.secondary">樓層：{floor}</Typography></Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Grid container alignItems="center" spacing={0.5}>
                              <Grid item><SquareFootIcon fontSize="small" sx={{ color: "#8b7355" }} /></Grid>
                              <Grid item><Typography variant="caption" color="text.secondary">坪數：{area} 坪</Typography></Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Grid container alignItems="center" spacing={0.5}>
                              <Grid item><GroupIcon fontSize="small" sx={{ color: "#8b7355" }} /></Grid>
                              <Grid item><Typography variant="caption" color="text.secondary">最多 {capacity} 人</Typography></Grid>
                            </Grid>
                          </Grid>
                        </Grid>

                        {/* 設備 Chips */}
                        {facilities.length > 0 && (
                          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8, mb: 1.5 }}>
                            {facilities.map((f) => (
                              <Chip
                                key={f}
                                label={f}
                                size="small"
                                sx={{ backgroundColor: "#f5f3ef", color: "#5a4a3a", fontSize: "12px" }}
                              />
                            ))}
                          </Box>
                        )}
                      </Box>

                      {/* 預約按鈕 */}
                      <Box sx={{ ml: 2, flexShrink: 0 }}>
                        <Button
                          variant="outlined"
                          onClick={() => navigate("/roomReserve", { state: { roomId: id } })}
                        >
                          前往預約
                        </Button>
                      </Box>
                    </Grid>

                    {/* 費用表格 */}
                    <Box>
                      <RoomTable id={id} price={price} />
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            );
          })}

          {/* ─── 分頁 ─────────────────────────────────────────── */}
          <Box sx={{ minWidth: "80vw", marginX: "auto", mb: 4 }}>
            <Grid container direction="row" justifyContent="flex-end">
              <Pagination
                count={totalPages}
                variant="string"
                shape="rounded"
                size="large"
                page={currentPage}
                renderItem={renderPageItem}
                onChange={handlePageChange}
              />
            </Grid>
          </Box>
        </Grid>
      </Paper>
      <div style={{ height: "100px" }} />
    </>
  );
};

export default Room;
