// ====== 실습 2 정답: ProfileCard 컴포넌트 ======

function ProfileCard({ name, role, emoji }) {
  return (
    <div className="profile-card">
      <p className="profile-emoji">{emoji}</p>
      <h3 className="profile-name">{name}</h3>
      <p className="profile-role">{role}</p>
    </div>
  )
}

export default ProfileCard
