import { useNavigate } from 'react-router-dom';
import { Member } from '../types';

interface SummaryCardProps {
  member: Member;
}

function SummaryCard({ member }: SummaryCardProps) {
  const { name, skills, shortIntro, imgSrc, isMine, id } = member;
  const badgeSkill = skills[0] ?? '';
  const navigate = useNavigate();

  return (
    <div className={isMine ? 'Mine' : ''} onClick={() => navigate(`/lions/${id}`)} style={{ cursor: 'pointer' }}>
      <div className="card">
        {imgSrc && (
          <img
            src={imgSrc}
            alt={name}
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        )}
        <p>{name}</p>
        <p><span className="badge">{badgeSkill}</span></p>
        <p className="short-intro">{shortIntro}</p>
      </div>
    </div>
  );
}

export default SummaryCard;
