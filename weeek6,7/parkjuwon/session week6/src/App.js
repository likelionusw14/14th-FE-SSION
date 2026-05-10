import './App.css';

function MenuItem({ name, price, emoji }) {
  return (
    <div className="menu-box">
      {emoji} {name} - {price}원
    </div>
  );
}

function App() {
  const foodList = [
    { name: '볶음밥', price: 8000, emoji: '🍳' },
    { name: '치킨', price: 20000, emoji: '🍗' },
    { name: '라면', price: 4500, emoji: '🍜' },
    { name: '떡볶이', price: 5500, emoji: '🥘' },
  ];

  const drinkList = [
    { name: '사이다', price: 2000, emoji: '🥤' },
    { name: '콜라', price: 2000, emoji: '🥤' }
  ];

  return (
    <div className="App">
      {/* [필수 3번] 카테고리 제목을 구분해서 넣기 */}
      <h1>멋사 분식 메뉴판</h1>

      <section>
        <h2>🍜 음식 메뉴</h2>
        {foodList.map((item, index) => (
          <MenuItem 
            key={index}
            name={item.name} 
            price={item.price} 
            emoji={item.emoji} 
          />
        ))}
      </section>

      <section>
        <h2>🥤 음료 메뉴</h2>
        {drinkList.map((item, index) => (
          <MenuItem 
            key={index}
            name={item.name} 
            price={item.price} 
            emoji={item.emoji} 
          />
        ))}
      </section>
    </div>
  );
  function isSoldOut(available){
    const available = [
      
    ]
  }
}

export default App;