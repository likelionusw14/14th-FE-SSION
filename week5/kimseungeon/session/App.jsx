// =============================================
// 5주차 과제 — App.jsx
// =============================================
import MenuItem from './MenuItem'

// 도전 과제: 메뉴 배열을 만들고 map()으로 한 번에 렌더링하기
const drinks = [
  { id: 1, name: '아메리카노', price: 4500, emoji: '☕' },
  { id: 2, name: '카페라떼', price: 5000, emoji: '🥛' },
  { id: 3, name: '녹차라떼', price: 5500, emoji: '🍵', isSoldOut: true },
  { id: 4, name: '딸기스무디', price: 6000, emoji: '🍓' },
]

const foods = [
  { id: 5, name: '크로와상', price: 3500, emoji: '🥐' },
  { id: 6, name: '치즈케이크', price: 6500, emoji: '🍰' },
  { id: 7, name: '베이글', price: 4000, emoji: '🥯', isSoldOut: true },
]

function App() {
  return (
    <div className="menu-board">
      <h1>🦁 멋사 카페</h1>

      {/* ☕ 음료 섹션 */}
      <h2>☕ 음료</h2>
      {drinks.map((item) => (
        <MenuItem
          key={item.id}
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
          key={item.id}
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
