// ====== 5주차 실습: App 컴포넌트 ======
import StudentCard from './StudentCard'

// 지난 주 script-sol.js 의 members 배열과 동일한 데이터
const members = [
  { id: 1, name: '김사자', present: false },
  { id: 2, name: '이사자', present: true  },
  { id: 3, name: '박사자', present: false },
  // TODO: 본인 이름을 포함한 멤버 2명을 추가해 보세요!
]

function App() {
  // TODO: 출석 인원 수를 계산하세요.
  //       힌트: members.filter(m => m.present).length
  const presentCount = 0

  return (
    <div className="container">
      <header>
        <h1>멋사 출석부</h1>
        <div className="stats">
          {/* TODO: 0 대신 presentCount 를, 0 대신 members.length 를 넣어보세요. */}
          출석 <span id="present-count">{presentCount}</span> / 전체 <span id="total-count">{members.length}</span>명
        </div>
      </header>

      <ul id="member-list">
        {/* TODO: members.map() 으로 StudentCard 를 렌더링하세요.
                  각 카드에 key, name, present prop 을 전달해야 합니다.
            힌트:
            {members.map(member => (
              <StudentCard
                key={member.id}
                name={member.name}
                present={member.present}
              />
            ))}
        */}
      </ul>
    </div>
  )
}

export default App
