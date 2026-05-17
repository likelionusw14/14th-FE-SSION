import { Link, Route, Routes } from 'react-router-dom'

function Home() {
  return <h1>홈 페이지</h1>
}

function About() {
  return <h1>소개 페이지</h1>
}

function App() {
  return (
    <div className="container">
      <nav>
        <Link to="/">홈</Link>
        <Link to="/about">소개</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  )
}

export default App