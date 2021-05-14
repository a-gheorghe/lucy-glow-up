import React from "react";
import dayjs from "dayjs";
import styled from "styled-components";

const Image = styled.img`
  object-fit: contain;
  width: 50%;
  height: auto;
`;

export const TimelineItem = ({ item }) => {
  return (
    <div className="timeline-item">
      <div className="timeline-item-content">
        <span className="circle"></span>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "20px",
            marginBottom: "20px",
          }}
        >
          <div style={{ marginBottom: "6px", fontWeight: "bold" }}>
            {" "}
            {dayjs.unix(item.date).format("MMMM D YYYY")}{" "}
          </div>
          <Image key={item.id} src={item.download_url} alt={item.description} />
        </div>
      </div>
    </div>
  );
};
