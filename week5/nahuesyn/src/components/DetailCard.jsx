function DetailCard({ lion }) {
  const techList = lion.tech.split(',').map((t) => t.trim())

  return (
    <article className="info-item">
      <h2>{lion.name}</h2>
      <p className="role">{lion.part} | {lion.club}</p>
      <div className="info-group">
        <h3>자기소개</h3>
        <p>{lion.detail}</p>
        <h3>연락처</h3>
        <ul>
          <li>이메일: {lion.email}</li>
          <li>전화: {lion.phone}</li>
          <li>웹사이트: {lion.site}</li>
        </ul>
        <h3>관심 기술</h3>
        <ul>
          {techList.map((tech, idx) => (
            <li key={idx}>{tech}</li>
          ))}
        </ul>
        <h3>한 마디</h3>
        <p>"{lion.word}"</p>
      </div>
    </article>
  )
}

export default DetailCard
