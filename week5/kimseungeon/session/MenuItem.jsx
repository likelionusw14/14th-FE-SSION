// =============================================
// 5주차 과제 — MenuItem.jsx
// =============================================
// props 3개: name(메뉴이름), price(가격), emoji(이모지)
// 도전 과제: isSoldOut prop 추가 (true면 품절 표시)

function MenuItem({ name, price, emoji, isSoldOut }) {
  return (
    <div className="menu-item">
      {/* 이모지 */}
      <p className="menu-emoji">{emoji}</p>

      {/* 메뉴 이름 */}
      <h3 className="menu-name">{name}</h3>

      {/* 가격 or 품절 표시 */}
      {isSoldOut ? (
        <p className="menu-soldout">품절</p>
      ) : (
        <p className="menu-price">{price.toLocaleString()}원</p>
      )}
    </div>
  )
}

export default MenuItem
