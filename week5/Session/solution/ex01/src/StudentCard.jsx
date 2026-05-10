// ====== 5주차 정답: StudentCard 컴포넌트 ======

function StudentCard({ name, present }) {
  const cardClass = present ? 'present' : ''

  return (
    <li className={cardClass}>
      <span>{name}</span>
      <span className="member-status">{present ? '✅' : '⬜'}</span>
    </li>
  )
}

export default StudentCard
