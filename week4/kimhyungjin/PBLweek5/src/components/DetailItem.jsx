function DetailItem({ member }) {
  const { name, part, org, intro, phone, email, website, quote, skills } = member;

  return (
    <div className="detail-item">
      <div className="detail-name">{name}</div>
      <div className="detail-part">{part}</div>
      {org && <div style={{ fontSize: '13px', color: '#666', marginBottom: '6px' }}>{org}</div>}
      {intro && <div className="detail-intro">{intro}</div>}
      {skills && skills.length > 0 && (
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
  );
}

export default DetailItem;
