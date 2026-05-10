// ====== 실습 2: ProfileCard 컴포넌트 ======
// TODO: props 세 개를 받도록 { } 안을 채우세요.
//       name(이름), role(역할), emoji(이모지)

function ProfileCard({ name, role, emoji }) {

  return (
    <div className="profile-card">

      {/* TODO: emoji를 표시하세요.  힌트: {emoji} */}
      <p className="profile-emoji">🙂</p>

      {/* TODO: name을 표시하세요.  힌트: {name} */}
      <h3 className="profile-name">이름</h3>

      {/* TODO: role을 표시하세요.  힌트: {role} */}
      <p className="profile-role">역할</p>

    </div>
  )
}

export default ProfileCard
