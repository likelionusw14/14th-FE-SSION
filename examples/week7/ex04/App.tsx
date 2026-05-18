import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

interface Todo {
  id: number
  text: string
  is_done: boolean
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputText, setInputText] = useState<string>('')

  // TODO 1: fetchTodos — todos 테이블 전체 조회
  const fetchTodos = async (): Promise<void> => {}

  useEffect(() => { fetchTodos() }, [])

  // TODO 2: addTodo — insert 후 fetchTodos
  const addTodo = async (): Promise<void> => {}

  // TODO 3: toggleDone — update(is_done 반전) 후 fetchTodos
  const toggleDone = async (t: Todo): Promise<void> => {}

  // TODO 4: deleteTodo — delete().eq('id', id) 후 fetchTodos
  const deleteTodo = async (id: number): Promise<void> => {}

  // TODO 5 (도전): clearDone — is_done이 true인 항목 일괄 삭제
  const clearDone = async (): Promise<void> => {}

  return (
    <div>
      <h1>📝 체크리스트</h1>
      <div>
        <input value={inputText} onChange={e => setInputText(e.target.value)} placeholder="할 일 입력" />
        <button onClick={addTodo}>추가</button>
        <button onClick={clearDone}>완료 삭제</button>
      </div>
      <ul>
        {todos.map(t => (
          <li key={t.id}>
            <input type="checkbox" checked={t.is_done} onChange={() => toggleDone(t)} />
            <span style={{ textDecoration: t.is_done ? 'line-through' : 'none' }}>{t.text}</span>
            <button onClick={() => deleteTodo(t.id)}>🗑</button>
          </li>
        ))}
      </ul>
      <p>남은 할 일: {todos.filter(t => !t.is_done).length}개</p>
    </div>
  )
}
