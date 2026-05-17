import {useEffect} from 'react'
import {useState} from 'react'

function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
          console.log("렌더링 완료");
        }, [count]) 
  if ( count % 10 == 0 ){
    console.log("야르");
  }
  return (
    <div className="container">
      <h1>useEffect 연습</h1>
      <h2>{count}</h2>
      <button onClick={() => setCount(count + 1)}>+1 증가</button>
    </div>
  )
}

export default App