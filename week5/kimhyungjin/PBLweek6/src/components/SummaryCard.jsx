function SummaryCard({ member }) {
  const { name, part, skills, shortIntro, phone, email, website, imgSrc, isMine } = member;
  const badgeSkill = skills[0] || '';

  return (
    <div className={isMine ? 'Mine' : ''}>
      <details className="card">
        <summary>
          {imgSrc && (
            <img src={imgSrc} alt={name} onError={e => { e.target.style.display = 'none'; }} />
          )}
          <p>{name}</p>
          <p><span className="badge">{badgeSkill}</span></p>
          <p className="short-intro">{shortIntro}</p>
          <span className="arrow">▼</span>
        </summary>
        <div className="detail">
          <ul>
            {skills.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
          <p>{phone || '전화번호 비공개'}</p>
          <p>{email || '메일 비공개'}</p>
          {website && <p><a href={website} target="_blank" rel="noreferrer">{website}</a></p>}
        </div>
      </details>
    </div>
  );
}

export default SummaryCard;
