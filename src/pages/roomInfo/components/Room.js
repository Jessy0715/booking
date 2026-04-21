import { useState, useEffect } from "react";
import { Skeleton, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const API_URL  = "http://localhost:3001";
const PAGE_SIZE = 5;

const SLOTS = [
  { key: "morning",   label: "上午", range: "09:00–12:00" },
  { key: "afternoon", label: "下午", range: "13:00–17:00" },
  { key: "night",     label: "晚上", range: "18:00–22:00" },
];

const Room = () => {
  const navigate = useNavigate();
  const [rooms, setRooms]           = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      setError(null);
      try {
        const res  = await fetch(`${API_URL}/api/rooms?page=${currentPage}&pageSize=${PAGE_SIZE}`);
        const json = await res.json();
        if (!json.success) throw new Error();
        setRooms(json.data);
        setTotalPages(json.pagination.totalPages);
      } catch {
        setError("無法連線至伺服器，請確認後端是否啟動。");
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── 載入骨架 ────────────────────────────────────────────────────
  if (loading) return (
    <div style={{ maxWidth: 880, margin: "0 auto", padding: "32px 24px" }}>
      {[1, 2, 3].map((i) => (
        <div key={i} style={{
          background: "var(--surface)", border: "1px solid var(--border-light)",
          borderRadius: "var(--r)", padding: 20, marginBottom: 16,
          display: "flex", gap: 24,
        }}>
          <Skeleton variant="rectangular" width={200} height={148} sx={{ borderRadius: 1, flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <Skeleton width="40%" height={24} />
            <Skeleton width="80%" height={16} sx={{ mt: 1 }} />
            <Skeleton variant="rectangular" height={72} sx={{ mt: 2, borderRadius: 1 }} />
          </div>
        </div>
      ))}
    </div>
  );

  if (error) return (
    <div style={{ padding: "40px 24px" }}>
      <Alert severity="error">{error}</Alert>
    </div>
  );

  return (
    <div style={{ maxWidth: 880, margin: "0 auto", padding: "32px 24px 64px" }}>

      {/* 標題 */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
        <div style={{ width: 3, height: 18, background: "var(--accent)", borderRadius: 2 }} />
        <span style={{
          fontFamily: "var(--font-serif)", fontSize: 17, fontWeight: 500,
          letterSpacing: "0.04em", color: "var(--text)",
        }}>
          精選空間
        </span>
      </div>

      {/* 卡片列表 */}
      {rooms.map((room, idx) => {
        const { id, roomImg, title, desc, price, floor, area, capacity, facilities } = room;
        return (
          <div
            key={id}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border-light)",
              borderRadius: "var(--r)",
              padding: 20,
              marginBottom: 16,
              display: "flex",
              gap: 24,
              transition: "border-color 0.15s, box-shadow 0.15s",
              animation: "fadeUp 0.4s ease both",
              animationDelay: `${idx * 0.07}s`,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.boxShadow   = "var(--shadow-md)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "var(--border-light)";
              e.currentTarget.style.boxShadow   = "none";
            }}
          >
            {/* 圖片 */}
            <div style={{
              width: 200, height: 148, flexShrink: 0,
              borderRadius: 8,
              backgroundImage: `url(${roomImg})`,
              backgroundSize: "cover", backgroundPosition: "center",
              backgroundColor: "var(--bg)",
            }} />

            {/* 資訊 */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, minWidth: 0 }}>

              {/* 標題列 */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", flexShrink: 0 }} />
                  <span style={{
                    fontFamily: "var(--font-serif)", fontSize: 15, fontWeight: 500,
                    letterSpacing: "0.02em", color: "var(--text)",
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}>
                    {title}
                  </span>
                </div>
                <button
                  className="room-book-btn"
                  onClick={() => navigate("/roomReserve", { state: { roomId: id } })}
                >
                  前往預約
                </button>
              </div>

              {/* 說明 */}
              <p style={{
                fontSize: 12.5, color: "var(--text-secondary)",
                lineHeight: 1.6, marginLeft: 14,
              }}>
                {desc}
              </p>

              {/* 規格列 */}
              <div style={{ display: "flex", gap: 16, marginLeft: 14, flexWrap: "wrap" }}>
                {[
                  { label: "坪數", value: `${area} 坪` },
                  { label: "樓層", value: floor },
                  { label: "容量", value: `${capacity} 人` },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.02em" }}>{label}</span>
                    <span style={{ fontSize: 12.5, fontWeight: 500, color: "var(--text-secondary)" }}>{value}</span>
                  </div>
                ))}
              </div>

              {/* 設備標籤 */}
              {facilities.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginLeft: 14 }}>
                  {facilities.map((f) => (
                    <span key={f} style={{
                      fontSize: 11, color: "var(--text-muted)",
                      border: "1px solid var(--border)", background: "var(--bg)",
                      borderRadius: 20, padding: "2px 10px", letterSpacing: "0.02em",
                    }}>
                      {f}
                    </span>
                  ))}
                </div>
              )}

              {/* 價格 Grid */}
              <div style={{
                display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
                border: "1px solid var(--border-light)",
                borderRadius: 8, overflow: "hidden", marginTop: 4,
              }}>
                {SLOTS.map((slot, i) => (
                  <div key={slot.key} style={{
                    padding: "10px 14px",
                    borderLeft: i > 0 ? "1px solid var(--border-light)" : "none",
                    background: slot.key === "afternoon" ? "var(--accent-light)" : "transparent",
                  }}>
                    <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4 }}>
                      {slot.label}　{slot.range}
                    </div>
                    <div style={{ fontSize: 13.5, fontWeight: 500, color: "var(--text)" }}>
                      NT$ {price[slot.key] ?? "—"}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        );
      })}

      {/* 分頁 */}
      {totalPages > 1 && (
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 6, marginTop: 24 }}>
          <button
            className="pg-btn"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >‹</button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`pg-btn${page === currentPage ? " active" : ""}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}

          <button
            className="pg-btn"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >›</button>
        </div>
      )}
    </div>
  );
};

export default Room;
