import {useState} from 'react'

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <h1>카운터</h1>

      <h2>{count}</h2>

      <button onClick={() => setCount(count + 1)}>+1 증가</button>
    </div>
  )
}



export default App