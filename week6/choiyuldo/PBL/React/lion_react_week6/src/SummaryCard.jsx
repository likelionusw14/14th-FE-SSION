import { Link } from 'react-router-dom';
import './SummaryCard.css';

function SummaryCard({ lion }) {
  return (
    // 🌟 Link 태그로 감싸서 클릭 시 이동하게 만듭니다.
    <Link to={`/lion/${lion.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <article className={`summary-card ${lion.isMe ? "me" : ""}`}>
        <div className="image-wrapper">
          <img src={lion.image || "https://via.placeholder.com/150"} alt={lion.name} />
          <span className="badge">{lion.interests[0] || "사자"}</span>
        </div>
        <h3>{lion.name}</h3>
        <p className="part">{lion.part}</p>
        <p className="intro">{lion.oneLine}</p>
      </article>
    </Link>
  );
}