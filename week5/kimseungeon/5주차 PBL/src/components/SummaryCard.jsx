// src/components/SummaryCard.jsx

function SummaryCard({ lion }) {
  const { name, part, photo, badge, bio, isMe } = lion

  return (
    <article className={`summary-card${isMe ? ' summary-card--mine' : ''}`}>
      <div className="summary-card__image-wrap">
        <img
          className="summary-card__photo"
          src={photo}
          alt={`${name} 프로필 사진`}
        />
        <span className="summary-card__badge">{badge}</span>
      </div>
      <div className="summary-card__info">
        <h2 className="summary-card__name">{name}</h2>
        <p className="summary-card__role">{part}</p>
        <p className="summary-card__bio">{bio}</p>
      </div>
    </article>
  )
}

export default SummaryCard
