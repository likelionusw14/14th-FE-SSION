import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

function Choi() {
  return <h1>바보</h1>
}

function Yul() {
  return <h1>멍청이</h1>
}


function Do() {
  return <h1>똥</h1>
}

function App() {

  return (
    <div className="container">
      <nav>
        <Link to="/choi">최</Link>
        <Link to="/yul">율</Link>
        <Link to="/do">도</Link>
      </nav>    
      <Routes>
        <Route path="/choi" element={<Choi />} />
        <Route path="/yul" element={<Yul />} />
        <Route path="/do" element={<Do />} />
      </Routes>
    </div>
  )
}

export default App