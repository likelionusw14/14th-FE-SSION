import { useState } from 'react'
import initialLions from './data/lions'
import ControlSection from './components/ControlSection'
import AddForm from './components/AddForm'
import OptionsSection from './components/OptionsSection'
import SummaryGrid from './components/SummaryGrid'
import DetailList from './components/DetailList'

function App() {
  const [lions, setLions] = useState(initialLions)
  const [showForm, setShowForm] = useState(false)
  const [apiStatus, setApiStatus] = useState('준비 완료')
  const [retryParams, setRetryParams] = useState(null)
  const [partFilter, setPartFilter] = useState('전체')
  const [sortOrder, setSortOrder] = useState('latest')
  const [searchQuery, setSearchQuery] = useState('')

  function handleAddLion(newLion) {
    setLions(prev => [...prev, newLion])
    setShowForm(false)
  }

  function handleDeleteLast() {
    setLions(prev => prev.slice(0, -1))
  }

  async function handleFetchRandom(count, isRefresh = false) {
    setRetryParams({ count, isRefresh })
    try {
      setApiStatus('불러오는 중...')
      const fetchCount = isRefresh
        ? Math.max(1, lions.filter(l => !l.isMe).length)
        : count
      const res = await fetch(
        `https://randomuser.me/api/?results=${fetchCount}&nat=us,gb,ca,au,nz`
      )
      if (!res.ok) throw new Error()
      const { results } = await res.json()
      const parts = ['Frontend', 'Backend', 'Design']
      const newLions = results.map((u, i) => ({
        id: Date.now() + i,
        name: `${u.name.first} ${u.name.last}`,
        part: parts[Math.floor(Math.random() * parts.length)],
        tech: 'JavaScript, HTML, CSS',
        simple: '외부에서 온 아기 사자입니다.',
        detail: `반갑습니다. 저는 ${u.location.city}에 사는 개발자입니다.`,
        email: u.email,
        phone: u.cell,
        site: '#',
        word: '만나서 반가워요!',
        club: '멋쟁이사자처럼',
        isMe: false,
        img: u.picture.large,
      }))
      setLions(prev => {
        if (isRefresh) {
          const myCard = prev.find(l => l.isMe)
          return myCard ? [myCard, ...newLions] : newLions
        }
        return [...prev, ...newLions]
      })
      setApiStatus('완료!')
      setTimeout(() => setApiStatus('준비 완료'), 2000)
    } catch {
      setApiStatus('실패!')
    }
  }

  function handleRetry() {
    if (retryParams) {
      handleFetchRandom(retryParams.count, retryParams.isRefresh)
    }
  }

  const filtered = lions.filter(l =>
    (partFilter === '전체' || l.part === partFilter) &&
    l.name.toLowerCase().includes(searchQuery.toLowerCase())
  )
  const displayLions = sortOrder === 'name'
    ? [...filtered].sort((a, b) => a.name.localeCompare(b.name))
    : filtered

  return (
    <main className="container">
      <ControlSection
        total={lions.length}
        apiStatus={apiStatus}
        showRetry={apiStatus === '실패!'}
        onToggleForm={() => setShowForm(prev => !prev)}
        onDeleteLast={handleDeleteLast}
        onFetch1={() => handleFetchRandom(1)}
        onFetch5={() => handleFetchRandom(5)}
        onRefreshAll={() => handleFetchRandom(0, true)}
        onRetry={handleRetry}
      />
      <AddForm
        isVisible={showForm}
        onAdd={handleAddLion}
        onCancel={() => setShowForm(false)}
      />
      <OptionsSection
        partFilter={partFilter}
        sortOrder={sortOrder}
        searchQuery={searchQuery}
        onPartChange={setPartFilter}
        onSortChange={setSortOrder}
        onSearchChange={setSearchQuery}
      />
      <SummaryGrid lions={displayLions} />
      <DetailList lions={displayLions} />
    </main>
  )
}

export default App
