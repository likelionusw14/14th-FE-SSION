import React from "react";
import './DetailCard.css';
function DetailCard({ lion }) {
  return (
    <article className="detail-card">
      <h3>{lion.name}</h3>
      <p>{lion.part} · 멋쟁이사자처럼</p>

      <ul>
        {lion.interests.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>

      <p>Email: {lion.contact.email}</p>
      <p>한 마디: {lion.message}</p>
    </article>
  );
}

export default DetailCard;


