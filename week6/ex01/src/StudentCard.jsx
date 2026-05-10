// ====== 5주차 실습: StudentCard 컴포넌트 ====== // 
function StudentCard({ name, present }) {
  const cardClass = present ? 'present' : ''

  return (
    <li className={cardClass}>
      <span> {name} </span>
      <span > {present ? '✅' : '⬜'} </span>

    </li>
  )
}

export default StudentCard
