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
        홈
        소개
      </nav>

      페이지 영역
    </div>
  )
}

export default App