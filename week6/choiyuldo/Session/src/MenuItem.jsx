// =============================================
// 5주차 과제 — MenuItem.jsx  (빈칸 채우기)
// =============================================
// TODO: props 3개를 받아야 합니다.
//       name(메뉴이름), price(가격), emoji(이모지)

function MenuItem({ name,price,emoji,soldOut}) {
  let out;
  if (soldOut){
    out = <span className = "menu-soldout">품절</span>

  }
  else{
    out = <span className = "menu-price">{price}</span>
  }
  return (
    <div className="menu-item">
      {/* TODO: emoji를 표시하세요 */}
      <p className = "menu-emoji" >{emoji}</p>

      {/* TODO: name을 표시하세요 */}
      <h3 className = "menu-name" > {name}</h3>

      {/* TODO: price를 표시하세요 */}
      {out}
      {/* {soldOut ? (
        <span className = "menu-soldout">품절</span>
      ):(
        <p className = "menu-price">{price}</p>
      )} */}
    </div>
  )
}


export default MenuItem
