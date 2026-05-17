import {useRef} from 'react'

function App() {
  const myBox = useRef(null);

  return (
    <div className="container">
      <h1>input 포커스</h1>
      <input 
        type="text" 
        placeholder="이름 입력"
        ref = {myBox}
        />

      <button onClick={() => myBox.current.focus()}>포커스 이동</button>
    </div>
  )
}

export default App
