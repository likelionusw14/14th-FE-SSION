import { useNavigate } from 'react-router-dom';

function SummaryCard({ member }) {
  const { name, part, skills, shortIntro, phone, email, website, imgSrc, isMine, id } = member;
  const badgeSkill = skills[0] || '';
  const navigate = useNavigate();

  return (
    <div className={isMine ? 'Mine' : ''} onClick={() => navigate(`/lions/${id}`)} style={{ cursor: 'pointer' }}>
      <div className="card">
        {imgSrc && (
          <img src={imgSrc} alt={name} onError={e => { e.target.style.display = 'none'; }} />
        )}
        <p>{name}</p>
        <p><span className="badge">{badgeSkill}</span></p>
        <p className="short-intro">{shortIntro}</p>
      </div>
    </div>
  );
}

export default SummaryCard;