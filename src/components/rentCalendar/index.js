import React, { useState } from "react";
import { Calendar, Badge, Modal, ConfigProvider } from "antd";
import "./index.css";
const RentCalendar = () => {
  const modalStyles = {
    header: {
      borderLeft: `5px solid #938C8C`,
      borderRadius: 0,
      paddingInlineStart: 5,
    },
  };
  const events = [
    {
      date: "2024-07-01",
      type: "warning",
      eventName: "團隊會議",
      eventLocation: "普101館",
      name: "林小明",
    },
    {
      date: "2024-07-02",
      type: "success",
      eventName: "客戶會議",
      eventLocation: "普101館",
      name: "林小明",
    },
    {
      date: "2024-07-03",
      type: "error",
      eventName: "項目截止",
      eventLocation: "普101館",
      name: "林小明",
    },
    {
      date: "2024-07-04",
      type: "default",
      eventName: "休假",
      eventLocation: "普101館",
      name: "林小明",
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // 日期選中時的回調函數
  const onSelect = (date) => {
    console.log("選中的日期是：", date.format("YYYY-MM-DD"));
  };

  const onPanelChange = (value, mode) => {
    console.log(value, mode, "detective month");
  };

  // 渲染日期的自定義內容
  const cellRender = (current, info) => {
    if (info.type === "date") {
      const formattedDate = current.format("YYYY-MM-DD");
      const currentDayEvents = events.filter(
        (event) => event.date === formattedDate
      );
      return (
        <div>
          <ul className="events">
            {currentDayEvents.map((event, index) => (
              <li
                key={index}
                style={{ listStyleType: "none", margin: 0, padding: 0 }}
              >
                <Badge
                  status={event.type}
                  text={
                    <span
                      onClick={() => showEventModal(event)}
                      style={{ cursor: "pointer" }}
                    >
                      {event.eventName}
                    </span>
                  }
                />
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return info.originNode;
  };

  const showEventModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      style={{
        maxWidth: "80vw",
        // maxHeight: "50vh",
        marginX: "auto",
      }}
    >
      <Calendar
        style={{
          padding: "20px",
        }}
        onSelect={onSelect} // 當日期被選中時的回調
        onPanelChange={onPanelChange}
        cellRender={cellRender} // 自定義日期顯示內容
      />
      <ConfigProvider
        modal={{
          styles: modalStyles,
        }}
      >
        <Modal
          title="租借資訊"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          {selectedEvent && (
            <div style={{ paddingLeft: "20px" }}>
              <p>活動: {selectedEvent.eventName}</p>
              <p>借用地點: {selectedEvent.eventLocation}</p>
              <p>借用時間: {selectedEvent.date}</p>
              <p>借用人: {selectedEvent.name}</p>
            </div>
          )}
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default RentCalendar;
