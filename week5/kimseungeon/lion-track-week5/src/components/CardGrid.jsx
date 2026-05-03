// src/components/CardGrid.jsx
import SummaryCard from './SummaryCard.jsx'

function CardGrid({ lions }) {
  return (
    <section className="card-grid" id="card-grid">
      {lions.map((lion) => (
        <SummaryCard key={lion.id} lion={lion} />
      ))}
    </section>
  )
}

export default CardGrid
