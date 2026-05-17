import { useParams, useNavigate } from 'react-router-dom'

const PART_COLORS = {
  Frontend: '#f97316',
  Backend: '#3b82f6',
  Design: '#a855f7',
}

export default function DetailPage({ lions }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const lion = lions.find((l) => String(l.id) === id)

  if (!lion) {
    return (
      <div className="empty-state">
        <p>😢 해당 아기사자를 찾을 수 없어요.</p>
        <button className="btn btn-primary" onClick={() => navigate('/')} style={{ marginTop: '1rem' }}>
          목록으로 돌아가기
        </button>
      </div>
    )
  }

  const partColor = PART_COLORS[lion.part] || '#888'

  return (
    <div className="detail-page">
      <button className="btn back-btn" onClick={() => navigate(-1)}>
        ← 목록으로
      </button>

      <div className="detail-card-full">
        <div className="detail-card-header">
          <div className="detail-avatar-lg">
            {lion.profileImage ? (
              <img src={lion.profileImage} alt={lion.name} />
            ) : (
              <div className="detail-avatar-placeholder-lg">🦁</div>
            )}
          </div>
          <div>
            <h1 className="detail-card-name">{lion.name}</h1>
            <span className="detail-card-part" style={{ color: partColor }}>{lion.part}</span>
            {lion.skill && <span className="detail-skill-tag">{lion.skill}</span>}
            <p className="detail-card-track">LION TRACK</p>
          </div>
        </div>

        <section className="detail-section-block">
          <h2>자기소개</h2>
          <p>{lion.bio || lion.intro}</p>
        </section>

        <section className="detail-section-block">
          <h2>연락처</h2>
          <ul>
            {lion.email && <li>Email: {lion.email}</li>}
            {lion.phone && <li>Phone: {lion.phone}</li>}
            {lion.website && <li><a href={lion.website} target="_blank" rel="noreferrer">{lion.website}</a></li>}
          </ul>
        </section>

        <section className="detail-section-block">
          <h2>관심 기술</h2>
          <ul>
            {lion.skill && lion.skill.split(',').map((s, i) => (
              <li key={i}>{s.trim()}</li>
            ))}
          </ul>
        </section>

        {lion.comment && (
          <section className="detail-section-block">
            <h2>한 마디</h2>
            <p>{lion.comment}</p>
          </section>
        )}
      </div>
    </div>
  )
}
