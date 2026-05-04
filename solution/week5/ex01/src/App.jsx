// ====== 5주차 정답: App 컴포넌트 ======
import StudentCard from './StudentCard'

const members = [
  { id: 1, name: '김사자', present: false },
  { id: 2, name: '이사자', present: true  },
  { id: 3, name: '박사자', present: false },
]

function App() {
  const presentCount = members.filter(m => m.present).length

  return (
    <div className="container">
      <header>
        <h1>멋사 출석부</h1>
        <div className="stats">
          출석 <span id="present-count">{presentCount}</span> / 전체 <span id="total-count">{members.length}</span>명
        </div>
      </header>

      <ul id="member-list">
        {members.map(member => (
          <StudentCard
            key={member.id}
            name={member.name}
            present={member.present}
          />
        ))}
      </ul>
    </div>
  )
}

export default App
