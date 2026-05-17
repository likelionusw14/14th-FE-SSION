import { useEffect, useState } from 'react'

function App() {
  const [title, setTitle] = useState('')

  const handleChange = (e) => {
    setTitle(e.target.value)
  }

  useEffect(() => {
    document.title = title
  }, [title])

  return (
    <div className="container">
      <h1>문서 제목 변경</h1>

      <input
        type="text"
        placeholder="제목 입력"
        onChange={handleChange}
      />
    </div>
  )
}

export default App