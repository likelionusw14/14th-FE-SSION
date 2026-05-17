import { Link } from 'react-router-dom';
import './SummaryCard.css';
import type { Lion } from './types';

interface SummaryCardProps {
  lion: Lion;
}

function SummaryCard({ lion }: SummaryCardProps) {
  return (
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

export default SummaryCard;