import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchLions } from '../utils/fetchLions'
import { useAsyncFetch } from '../hooks/useAsyncFetch'
import { useViewOptions } from '../hooks/useViewOptions'
import ControlBar from '../components/ControlBar'
import LionCard from '../components/LionCard'
import AddForm from '../components/AddForm'

let nextId = 100

export default function ListPage({ lions, setLions }) {
  const [showForm, setShowForm] = useState(false)
  const navigate = useNavigate()
  const { run, retry, status, statusText, isLoading } = useAsyncFetch()
  const {
    partFilter, setPartFilter,
    sortBy, setSortBy,
    searchQuery, setSearchQuery,
    filteredLions,
  } = useViewOptions(lions)

  const handleAdd = (formData) => {
    setLions((prev) => [...prev, { ...formData, id: ++nextId }])
  }

  const handleDeleteLast = () => {
    setLions((prev) => prev.length === 0 ? prev : prev.slice(0, -1))
  }

  const handleAddRandom1 = () => {
    run(async () => {
      const newLions = await fetchLions(1)
      setLions((prev) => [...prev, ...newLions])
    })
  }

  const handleAddRandom5 = () => {
    run(async () => {
      const newLions = await fetchLions(5)
      setLions((prev) => [...prev, ...newLions])
    })
  }

  const handleRefreshAll = () => {
    run(async () => {
      const myLions = lions.filter((l) => l.id <= 3)
      const count = Math.max(lions.length - myLions.length, 1)
      const newLions = await fetchLions(count)
      setLions([...myLions, ...newLions])
    })
  }

  return (
    <>
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

      {filteredLions.length === 0 ? (
        <div className="empty-state">
          <p>🔍 조건에 맞는 아기사자가 없어요!</p>
        </div>
      ) : (
        <div className="card-grid">
          {filteredLions.map((lion) => (
            <div key={lion.id} onClick={() => navigate(`/lions/${lion.id}`)} style={{ cursor: 'pointer' }}>
              <LionCard lion={lion} />
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <AddForm onAdd={handleAdd} onClose={() => setShowForm(false)} />
      )}
    </>
  )
}
