// =============================================
// 5주차 과제 — App.jsx  (빈칸 채우기)
// =============================================
import MenuItem from './MenuItem'

const drinks = [
  { name: "아메리카노", price: "4,000원", emoji: "☕", isSoldOut: false },
  { name: "카페라떼",  price: "4,500원", emoji: "☕", isSoldOut: false },
  { name: "카푸치노",  price: "5,000원", emoji: "☕", isSoldOut: false },
]

const foods = [
  { name: "베이글",   price: "3,000원", emoji: "🥯", isSoldOut: false },
  { name: "샌드위치", price: "5,000원", emoji: "🥪", isSoldOut: false },
]

function App() {
  return (
    <div className="menu-board">
      <h1>🦁 멋사 카페</h1>

      {/* ☕ 음료 섹션 */}
      <h2>☕ 음료</h2>
      {drinks.map((item) => (
        <MenuItem
          key={item.name}
          name={item.name}
          price={item.price}
          emoji={item.emoji}
          isSoldOut={item.isSoldOut}
        />
      ))}

      {/* 🍽️ 음식 섹션 */}
      <h2>🍽️ 음식</h2>
      {foods.map((item) => (
        <MenuItem
          key={item.name}
          name={item.name}
          price={item.price}
          emoji={item.emoji}
          isSoldOut={item.isSoldOut}
        />
      ))}

    </div>
  )
}

export default App
