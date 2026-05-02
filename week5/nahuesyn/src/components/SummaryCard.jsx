function SummaryCard({ lion }) {
  const firstTech = lion.tech.split(',')[0].trim()

  return (
    <article className={`card ${lion.isMe ? 'my-card' : ''}`}>
      <div className="img-box">
        <img src={lion.img} alt={lion.name} />
        <span className="badge">{firstTech}</span>
      </div>
      <div className="card-content">
        <h4>{lion.name}</h4>
        <p className="role">{lion.part}</p>
        <p>{lion.simple}</p>
      </div>
    </article>
  )
}

export default SummaryCard
