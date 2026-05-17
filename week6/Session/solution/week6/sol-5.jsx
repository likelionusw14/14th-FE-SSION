import { useRef } from 'react'

function App() {
  const inputRef = useRef(null)

  const handleFocus = () => {
    inputRef.current.focus()
  }

  return (
    <div className="container">
      <h1>input 포커스</h1>

      <input
        type="text"
        placeholder="이름 입력"
        ref={inputRef}
      />

      <button onClick={handleFocus}>
        포커스 이동
      </button>
    </div>
  )
}

export default App