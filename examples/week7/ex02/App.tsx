import { useState } from 'react'

// TODO 1: Todo interface를 정의하세요 (id, text, isDone)

export default function App() {
  // TODO 2: useState<Todo[]>([]) 로 todos 상태를 만드세요
  const [todos, setTodos] = useState([])
  const [inputText, setInputText] = useState('')

  // TODO 3: addTodo — 새 Todo를 배열에 추가
  const addTodo = (): void => {}

  // TODO 4: toggleDone — id가 일치하는 항목의 isDone 반전
  const toggleDone = (id: number): void => {}

  // TODO 5: deleteTodo — id가 일치하는 항목을 filter로 제거
  const deleteTodo = (id: number): void => {}

  const remaining = todos.filter(t => !t.isDone).length

  return (
    <div>
      <h1>📝 체크리스트</h1>
      <div>
        <input value={inputText} onChange={e => setInputText(e.target.value)} placeholder="할 일 입력" />
        <button onClick={addTodo}>추가</button>
      </div>
      <ul>
        {todos.map(t => (
          <li key={t.id}>
            <input type="checkbox" checked={t.isDone} onChange={() => toggleDone(t.id)} />
            <span style={{ textDecoration: t.isDone ? 'line-through' : 'none' }}>{t.text}</span>
            <button onClick={() => deleteTodo(t.id)}>🗑</button>
          </li>
        ))}
      </ul>
      <p>남은 할 일: {remaining}개</p>
    </div>
  )
}
