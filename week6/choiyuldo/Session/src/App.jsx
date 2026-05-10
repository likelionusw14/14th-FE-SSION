// =============================================
// 5주차 과제 — App.jsx  (빈칸 채우기)
// =============================================
import MenuItem from './MenuItem'

function App() {
  return (
    <div className="menu-board">
      <h1>🦁 멋사 카페</h1>

      {/* ☕ 음료 섹션 */}
      <h2>☕ 음료</h2>
      <MenuItem name = "아메리카노" price = "3000" emoji = "☕" soldOut = {true}/>
      <MenuItem name = "카페라떼" price = "3000" emoji = "☕" soldOut = {false}/>
      <MenuItem name = "카푸치노" price = "3000" emoji = "☕" soldOut = {true}/>
      {/* TODO: MenuItem 컴포넌트를 사용해 음료 메뉴 3개 이상 추가하세요.
          각 컴포넌트에 name, price, emoji prop을 넘겨야 합니다.  
        <MenuItem name = 
      */}


      {/* 🍽️ 음식 섹션 */}
      <h2>🍽️ 음식</h2>
      <MenuItem name = "샌드위치" price = "3000" emoji = "☕"/>
      <MenuItem name = "샐러드" price = "4000" emoji = "☕"/>
      {/* TODO: 음식 메뉴도 2개 이상 추가하세요. */}


    </div>
  )
}

export default App
