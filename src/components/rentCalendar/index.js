import React, { useState, useEffect, useCallback, useRef } from "react";
import { Calendar, Modal, ConfigProvider, Tag, Spin, Button, List } from "antd";
import dayjs from "dayjs";
import "./index.css";

const API_URL = "http://localhost:3001";

const TIME_SLOT_LABEL = {
  morning:   "上午",
  afternoon: "下午",
  night:     "晚上",
};

const STATUS_BADGE = {
  pending:  "warning",
  approved: "success",
  rejected: "error",
};

const STATUS_TAG = {
  pending:  { color: "orange", text: "審核中" },
  approved: { color: "green",  text: "已核准" },
  rejected: { color: "red",    text: "已拒絕" },
};

const modalStyles = {
  header: {
    borderLeft: `5px solid #938C8C`,
    borderRadius: 0,
    paddingInlineStart: 5,
  },
};

const RentCalendar = ({ onDateClick, refreshTrigger }) => {
  const [bookings, setBookings]       = useState([]);
  const [loading, setLoading]         = useState(false);
  const [dayOverview, setDayOverview] = useState({ open: false, date: "", list: [] });
  const [detailModal, setDetailModal] = useState({ open: false, event: null });
  const eventClickedRef               = useRef(false);

  // 判斷目前登入角色，一般使用者只看 approved（已確認的預約）
  const user    = JSON.parse(localStorage.getItem("user") || "{}");
  const isAdmin = user.role === "admin";

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      // admin 看全部狀態；一般使用者只看已核准的
      const url  = isAdmin
        ? `${API_URL}/api/bookings`
        : `${API_URL}/api/bookings?status=approved`;
      const res  = await fetch(url);
      const json = await res.json();
      if (json.success) setBookings(json.data);
    } catch (err) {
      console.error("無法取得預約資料", err);
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings, refreshTrigger]);

  const getBookingsForDate = (date) => {
    const formatted = date.format("YYYY-MM-DD");
    return bookings.filter((b) => b.date === formatted);
  };

  const handleCalendarSelect = (date) => {
    if (eventClickedRef.current) { eventClickedRef.current = false; return; }
    if (date.isBefore(dayjs(), "day")) return;

    const dayBookings = getBookingsForDate(date);
    if (dayBookings.length > 0) {
      setDayOverview({ open: true, date: date.format("YYYY-MM-DD"), list: dayBookings });
    } else {
      onDateClick && onDateClick(date.format("YYYY-MM-DD"));
    }
  };

  const cellRender = (current, info) => {
    if (info.type !== "date") return info.originNode;
    const dayBookings = getBookingsForDate(current);
    return (
      <ul className="events">
        {dayBookings.map((b) => (
          <li key={b.id} style={{ listStyleType: "none", margin: 0, padding: 0 }}>
            <span
              onMouseDown={() => { eventClickedRef.current = true; }}
              onClick={() => setDetailModal({ open: true, event: b })}
              className={`cal-chip cal-chip-${b.timeSlot}`}
            >
              {TIME_SLOT_LABEL[b.timeSlot]} {b.roomTitle || ""}
            </span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div style={{ maxWidth: "80vw" }}>
      <Spin spinning={loading}>
        <Calendar
          style={{ padding: "20px" }}
          cellRender={cellRender}
          onSelect={handleCalendarSelect}
          disabledDate={(date) => date.isBefore(dayjs(), "day")}
        />
      </Spin>

      {/* 當日預約總覽 */}
      <ConfigProvider modal={{ styles: modalStyles }}>
        <Modal
          title={`${dayOverview.date} 的預約狀況`}
          open={dayOverview.open}
          onCancel={() => setDayOverview({ open: false, date: "", list: [] })}
          footer={
            <Button
              type="primary"
              style={{ backgroundColor: "#938C8C", borderColor: "#938C8C" }}
              onClick={() => {
                setDayOverview({ open: false, date: "", list: [] });
                onDateClick && onDateClick(dayOverview.date);
              }}
            >
              新增此日預約
            </Button>
          }
        >
          <List
            dataSource={dayOverview.list}
            renderItem={(b) => (
              <List.Item
                style={{ cursor: "pointer", padding: "8px 4px" }}
                onClick={() => {
                  setDayOverview({ open: false, date: "", list: [] });
                  setDetailModal({ open: true, event: b });
                }}
              >
                <List.Item.Meta
                  title={
                    <span>
                      <Tag color={STATUS_BADGE[b.status]}>{TIME_SLOT_LABEL[b.timeSlot]}</Tag>
                      {b.roomTitle || "—"}
                    </span>
                  }
                  description={`預約人：${b.userName || "—"}　事由：${b.reason || "—"}`}
                />
                <Tag color={STATUS_TAG[b.status]?.color}>{STATUS_TAG[b.status]?.text}</Tag>
              </List.Item>
            )}
          />
        </Modal>
      </ConfigProvider>

      {/* 單筆預約詳情 */}
      <ConfigProvider modal={{ styles: modalStyles }}>
        <Modal
          title="預約詳情"
          open={detailModal.open}
          onCancel={() => setDetailModal({ open: false, event: null })}
          footer={null}
          destroyOnClose
        >
          {detailModal.event && (
            <div style={{ paddingLeft: "10px", lineHeight: "2.2" }}>
              <p>
                <strong>狀態：</strong>
                <Tag color={STATUS_TAG[detailModal.event.status]?.color}>
                  {STATUS_TAG[detailModal.event.status]?.text}
                </Tag>
              </p>
              <p><strong>場地：</strong>{detailModal.event.roomTitle || "—"}</p>
              <p><strong>日期：</strong>{detailModal.event.date}</p>
              <p><strong>時段：</strong>{TIME_SLOT_LABEL[detailModal.event.timeSlot]}</p>
              <p><strong>預約人：</strong>{detailModal.event.userName || "—"}</p>
              <p><strong>事由：</strong>{detailModal.event.reason || "—"}</p>
            </div>
          )}
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default RentCalendar;
