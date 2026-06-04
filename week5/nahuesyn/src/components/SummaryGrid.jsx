import SummaryCard from './SummaryCard'

function SummaryGrid({ lions }) {
  return (
    <section className="summary-section">
      <div className="grid-wrapper">
        {lions.length === 0 ? (
          <p id="empty-state">
            표시할 아기 사자가 없습니다. (필터/검색 조건을 확인해 주세요)
          </p>
        ) : (
          lions.map(lion => <SummaryCard key={lion.id} lion={lion} />)
        )}
      </div>
    </section>
  )
}

export default SummaryGrid
