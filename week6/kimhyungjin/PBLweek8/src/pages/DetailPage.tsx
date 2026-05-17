import { useParams, useNavigate } from 'react-router-dom';
import initialLions from '../data/lions';
import '../styles/style.css';

function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const member = initialLions.find(m => m.id === Number(id));

  if (!member) {
    return (
      <div className="wrapper">
        <p>존재하지 않는 멤버입니다.</p>
        <button onClick={() => navigate('/')}>목록으로 돌아가기</button>
      </div>
    );
  }

  const { name, part, org, intro, phone, email, website, quote, skills, imgSrc } = member;

  return (
    <div className="wrapper">
      <button onClick={() => navigate(-1)}>← 뒤로 가기</button>

      <div className="detail-item" style={{ marginTop: '20px' }}>
        {imgSrc && <img src={imgSrc} alt={name} style={{ width: '200px', borderRadius: '8px' }} />}
        <div className="detail-name">{name}</div>
        <div className="detail-part">{part}</div>
        {org && <div style={{ fontSize: '13px', color: '#666', marginBottom: '6px' }}>{org}</div>}
        {intro && <div className="detail-intro">{intro}</div>}
        {skills.length > 0 && (
          <div className="detail-skills">
            {skills.map((s, i) => <span key={i} className="skill-tag">{s}</span>)}
          </div>
        )}
        <div className="detail-meta">
          <span>📞 {phone || '비공개'}</span>
          <span>✉️ {email || '비공개'}</span>
          {website && <span>🌐 <a href={website} target="_blank" rel="noreferrer">{website}</a></span>}
          {quote && <span>💬 "{quote}"</span>}
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
