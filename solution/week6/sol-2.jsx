import { useState } from 'react'

function App() {
  const [nickname, setNickname] = useState('')

  const handleChange = (e) => {
    setNickname(e.target.value)
  }

  return (
    <div className="container">
      <h1>닉네임 입력</h1>

      <input
        type="text"
        placeholder="닉네임 입력"
        onChange={handleChange}
      />

      <p>안녕하세요, {nickname}님</p>
    </div>
  )
}

export default App