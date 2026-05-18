import { useState } from 'react'

// TODO 1: Student interface를 정의하세요 (id, name, isPresent)

export default function App() {
  // TODO 2: useState<Student[]>([]) 로 students 상태를 만드세요
  const [students, setStudents] = useState([])
  const [inputName, setInputName] = useState('')
  const [nextId, setNextId] = useState(1)

  // TODO 3: addStudent 함수를 완성하세요
  // - inputName이 빈 문자열이면 return
  // - newStudent 객체를 만들어 배열에 추가
  const addStudent = () => {}

  // TODO 4: togglePresent 함수를 완성하세요
  // - id가 일치하는 학생의 isPresent를 반전
  const togglePresent = (id: number) => {}

  const presentCount = students.filter(s => s.isPresent).length

  return (
    <div>
      <h1>🦁 멋사 출석부</h1>
      <div>
        <input value={inputName} onChange={e => setInputName(e.target.value)} placeholder="이름 입력" />
        <button onClick={addStudent}>추가</button>
      </div>
      <ul>
        {students.map(s => (
          <li key={s.id} onClick={() => togglePresent(s.id)}>
            {s.isPresent ? '✅' : '⬜'} {s.name}
          </li>
        ))}
      </ul>
      <p>출석 {presentCount} / 전체 {students.length}명</p>
    </div>
  )
}
