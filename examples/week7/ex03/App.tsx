import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

interface Student {
  id: number
  name: string
  is_present: boolean
}

export default function App() {
  const [students, setStudents] = useState<Student[]>([])
  const [inputName, setInputName] = useState<string>('')

  // TODO 1: fetchStudents — students 테이블 전체 조회 후 setStudents
  const fetchStudents = async (): Promise<void> => {}

  // TODO 2: useEffect로 컴포넌트 마운트 시 fetchStudents 호출
  useEffect(() => {}, [])

  // TODO 3: addStudent — insert 후 fetchStudents 호출
  const addStudent = async (): Promise<void> => {}

  // TODO 4: togglePresent — update(is_present 반전) 후 fetchStudents 호출
  const togglePresent = async (s: Student): Promise<void> => {}

  return (
    <div>
      <h1>🦁 멋사 출석부</h1>
      <div>
        <input value={inputName} onChange={e => setInputName(e.target.value)} placeholder="이름 입력" />
        <button onClick={addStudent}>추가</button>
      </div>
      <ul>
        {students.map(s => (
          <li key={s.id} onClick={() => togglePresent(s)}>
            {s.is_present ? '✅' : '⬜'} {s.name}
          </li>
        ))}
      </ul>
      <p>출석 {students.filter(s => s.is_present).length} / 전체 {students.length}명</p>
    </div>
  )
}
