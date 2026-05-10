import { useEffect, useRef, useState } from 'react'

function App() {
  const [text, setText] = useState('')
  const prevRef = useRef('')

  useEffect(() => {
    prevRef.current = text
  }, [text])

  const handleChange = (e) => {
    setText(e.target.value)
  }

  return (
    <div className="container">
      <h1>이전 값 저장</h1>

      <input type="text" onChange={handleChange} />

      <p>현재 값: {text}</p>
      <p>이전 값: {prevRef.current}</p>
    </div>
  )
}

export default App