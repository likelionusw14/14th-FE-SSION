// src/components/DetailList.jsx
import DetailCard from './DetailCard.jsx'

function DetailList({ lions }) {
  return (
    <section className="detail-list" id="detail-list">
      {lions.map((lion) => (
        <DetailCard key={lion.id} lion={lion} />
      ))}
    </section>
  )
}

export default DetailList
