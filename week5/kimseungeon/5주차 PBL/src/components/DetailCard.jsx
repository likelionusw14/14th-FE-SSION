// src/components/DetailCard.jsx

function DetailCard({ lion }) {
  const { name, part, intro, email, phone, website, skills, comment } = lion

  return (
    <article className="detail-card">
      <header className="detail-card__header">
        <h2 className="detail-card__name">{name}</h2>
        <p className="detail-card__role">{part}</p>
        <p className="detail-card__track">LION TRACK</p>
      </header>

      <section className="detail-card__section">
        <h3 className="section-title">자기소개</h3>
        <p className="section-body">{intro}</p>
      </section>

      <section className="detail-card__section">
        <h3 className="section-title">연락처</h3>
        <ul className="bullet-list">
          {email && <li>Email: {email}</li>}
          {phone && <li>Phone: {phone}</li>}
          {website && (
            <li>
              <a href={website}>{website}</a>
            </li>
          )}
        </ul>
      </section>

      <section className="detail-card__section">
        <h3 className="section-title">관심 기술</h3>
        <ul className="bullet-list">
          {skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </section>

      <section className="detail-card__section">
        <h3 className="section-title">한 마디</h3>
        <p className="section-body">{comment}</p>
      </section>
    </article>
  )
}

export default DetailCard
