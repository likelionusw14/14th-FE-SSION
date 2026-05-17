const PART_COLORS = {
  Frontend: '#f97316',
  Backend: '#3b82f6',
  Design: '#a855f7',
}

export default function LionDetail({ lion }) {
  const partColor = PART_COLORS[lion.part] || '#888'

  return (
    <div className="lion-detail">
      <div className="detail-avatar">
        {lion.profileImage ? (
          <img src={lion.profileImage} alt={lion.name} />
        ) : (
          <div className="detail-avatar-placeholder">🦁</div>
        )}
      </div>

      <div className="detail-info">
        <div className="detail-header">
          <h3 className="detail-name">{lion.name}</h3>
          <span className="detail-part" style={{ color: partColor }}>{lion.part}</span>
          {lion.skill && <span className="detail-skill">{lion.skill}</span>}
        </div>
        <p className="detail-intro">{lion.intro}</p>
        {lion.bio && <p className="detail-bio">{lion.bio}</p>}
        <div className="detail-meta">
          {lion.email && <span>📧 {lion.email}</span>}
          {lion.phone && <span>📞 {lion.phone}</span>}
          {lion.website && <span>🌐 {lion.website}</span>}
        </div>
        {lion.comment && <p className="detail-comment">💬 {lion.comment}</p>}
      </div>
    </div>
  )
}
