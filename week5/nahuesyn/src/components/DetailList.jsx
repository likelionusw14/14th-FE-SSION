import DetailCard from './DetailCard'

function DetailList({ lions }) {
  return (
    <section className="detail-section">
      {lions.map((lion) => (
        <DetailCard key={lion.id} lion={lion} />
      ))}
    </section>
  )
}

export default DetailList
