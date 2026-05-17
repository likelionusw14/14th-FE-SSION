import { useEffect } from 'react'

function App() {
  useEffect(() => {
    console.log('처음 렌더링 완료')
  }, [])

  return (
    <div className="container">
      <h1>useEffect 연습</h1>
    </div>
  )
}

export default App