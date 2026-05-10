// =============================================
// 5주차 과제 — App.jsx  (빈칸 채우기)
// =============================================
import MenuItem from './MenuItem'

const beverage = [
  { name: '쿠키쉐이크', price: '6,300원', emoji : '🍪' },
  { name: '제철 맞은 딸기 라떼', price: '6,800원', emoji : '🍓'  },
  { name: '아메리카노', price: '4,700원', emoji : '☕'},
]
const cake = [
  {name: '떠먹는 아박', price : '6,500원', emoji : '🎂'},
  {name: '스초생', price : '7,200원', emoji : '🍰'},
]

function App() {
  return (
    <div className="menu-board">
      <h1>🦁 멋사 카페</h1>

      {/* ☕ 음료 섹션 */}
      <h2>☕ 음료</h2>

      {/* TODO: MenuItem 컴포넌트를 사용해 음료 메뉴 3개 이상 추가하세요.
          각 컴포넌트에 name, price, emoji prop을 넘겨야 합니다.
      */}
      {beverage.map(bever => <MenuItem name={bever.name} price={bever.price} emoji={bever.emoji} />)}

      {/* 🍽️ 음식 섹션 */}
      <h2>🍽️ 음식</h2>

      {/* TODO: 음식 메뉴도 2개 이상 추가하세요. */}
      {cake.map(cakecake => <MenuItem name={cakecake.name} price={cakecake.price} emoji={cakecake.emoji} />)}

    </div>
  )
}

export default App
