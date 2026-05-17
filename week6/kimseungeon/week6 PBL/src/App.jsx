import { useState } from 'react'
import { initialLions } from './data/lions'
import { fetchLions } from './utils/fetchLions'
import { useAsyncFetch } from './hooks/useAsyncFetch'
import { useViewOptions } from './hooks/useViewOptions'
import ControlBar from './components/ControlBar'
import LionCard from './components/LionCard'
import LionDetail from './components/LionDetail'
import AddForm from './components/AddForm'

let nextId = 100

export default function App() {
  const [lions, setLions] = useState(initialLions)
  const [showForm, setShowForm] = useState(false)
  const { run, retry, status, statusText, isLoading } = useAsyncFetch()
  const {
    partFilter, setPartFilter,
    sortBy, setSortBy,
    searchQuery, setSearchQuery,
    filteredLions,
  } = useViewOptions(lions)

  // 명단 추가 (폼)
  const handleAdd = (formData) => {
    setLions((prev) => [...prev, { ...formData, id: ++nextId }])
  }

  // 마지막 삭제
  const handleDeleteLast = () => {
    setLions((prev) => {
      if (prev.length === 0) return prev
      return prev.slice(0, -1)
    })
  }

  // 랜덤 1명 추가
  const handleAddRandom1 = () => {
    run(async () => {
      const newLions = await fetchLions(1)
      setLions((prev) => [...prev, ...newLions])
    })
  }

  // 랜덤 5명 추가
  const handleAddRandom5 = () => {
    run(async () => {
      const newLions = await fetchLions(5)
      setLions((prev) => [...prev, ...newLions])
    })
  }

  // 전체 새로고침 (내 카드 제외, 인원 수 보존)
  const handleRefreshAll = () => {
    run(async () => {
      const myLions = lions.filter((l) => l.id <= 3) // 초기 데이터 = 내 카드
      const count = Math.max(lions.length - myLions.length, 1)
      const newLions = await fetchLions(count)
      setLions([...myLions, ...newLions])
    })
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🦁 아기사자 명단</h1>
      </header>

      <main className="app-main">
        <ControlBar
          total={lions.length}
          onOpenForm={() => setShowForm(true)}
          onDeleteLast={handleDeleteLast}
          onAddRandom1={handleAddRandom1}
          onAddRandom5={handleAddRandom5}
          onRefreshAll={handleRefreshAll}
          statusText={statusText}
          status={status}
          isLoading={isLoading}
          onRetry={retry}
          partFilter={partFilter} setPartFilter={setPartFilter}
          sortBy={sortBy} setSortBy={setSortBy}
          searchQuery={searchQuery} setSearchQuery={setSearchQuery}
        />

        {/* 요약 카드 그리드 */}
        {filteredLions.length === 0 ? (
          <div className="empty-state">
            <p>🔍 조건에 맞는 아기사자가 없어요!</p>
          </div>
        ) : (
          <div className="card-grid">
            {filteredLions.map((lion) => (
              <LionCard key={lion.id} lion={lion} />
            ))}
          </div>
        )}

        {/* 상세 목록 */}
        {filteredLions.length > 0 && (
          <section className="detail-section">
            <h2>📋 상세 자기소개</h2>
            <div className="detail-list">
              {filteredLions.map((lion) => (
                <LionDetail key={lion.id} lion={lion} />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* 추가 폼 모달 */}
      {showForm && (
        <AddForm onAdd={handleAdd} onClose={() => setShowForm(false)} />
      )}
    </div>
  )
}
