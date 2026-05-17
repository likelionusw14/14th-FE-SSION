import React from "react";
import './SummaryCard.css'; 

function SummaryCard({ lion }) {
  return (
    <article className={`summary-card ${lion.isMe ? "me" : ""}`}>
      <div className="image-wrapper">
        <img
          src={lion.image || "https://via.placeholder.com/150"}
          alt={lion.name}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/150";
          }}
        />
        <span className="badge">
          {lion.interests[0] || "사자"}
        </span>
      </div>

      <h3>{lion.name}</h3>
      <p className="part">{lion.part}</p>
      <p className="intro">{lion.oneLine}</p>
    </article>
  );
}

export default SummaryCard;