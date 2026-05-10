// ====== 실습 2 정답: App 컴포넌트 ======
import ProfileCard from './ProfileCard'

function App() {
  return (
    <div>
      <h1>🦁 멋사 프로필</h1>

      <div className="card-list">
        <ProfileCard name="홍길동" role="학생" emoji="🙋" />
        <ProfileCard name="김영희" role="학생" emoji="👩‍💻" />
        <ProfileCard name="최사자" role="교수" emoji="🦁" />
      </div>
    </div>
  )
}

export default App
