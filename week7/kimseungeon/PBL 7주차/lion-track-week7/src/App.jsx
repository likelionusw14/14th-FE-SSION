import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { initialLions } from './data/lions'
import ListPage from './pages/ListPage'
import DetailPage from './pages/DetailPage'

export default function App() {
  const [lions, setLions] = useState(initialLions)

  return (
    <BrowserRouter>
      <div className="app">
        <header className="app-header">
          <h1>🦁 아기사자 명단</h1>
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<ListPage lions={lions} setLions={setLions} />} />
            <Route path="/lions/:id" element={<DetailPage lions={lions} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
