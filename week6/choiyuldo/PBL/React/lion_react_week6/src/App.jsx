import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Husigidane from './assets/0001.webp';
import './App.css';
import { fetchRandomLions } from './Api.jsx';

// 새로 만든 페이지들 불러오기
import ListPage from './ListPage.jsx';
import DetailPage from './DetailPage.jsx';

function App() {
  const [lions, setLions] = useState([{
    id: Date.now(),
    isMe: true,
    image: Husigidane,
    name: "ME",
    part: "Frontend",
    interests: ["HTML / CSS", "JavaScript", "React"],
    oneLine: "구조 잡는 걸 좋아합니다",
    intro: "안정적인 화면 구성이 목표입니다.",
    contact: { email: "example@mail.com", phone: "010-0000-0000", site: "https://github.com" },
    message: "즐겁게 성장하고 싶어요!"
  }]);

  const [apiStatus, setApiStatus] = useState({text : "준비 완료", color: "black", isError: false});

  const handleFetch = async (action, count) => {
    try {
      setApiStatus({ text: "로딩 중...", color: "blue" });
      const newLions = await fetchRandomLions(count); 

      if (action === "add") {
        setLions(prev => [...prev, ...newLions]);
      } else {
        const me = lions.filter(l => l.isMe);
        setLions([...me, ...newLions]);
      }
      setApiStatus({ text: "준비 완료", color: "black" });
    } catch (error) {
      setApiStatus({ text: "데이터 요청 실패!", color: "red" });
    }
  };

  useEffect(() => {
    handleFetch("add", 3);
  }, []);

  const removeLion = () => {
    if (lions.length > 1) setLions(prev => prev.slice(0,-1));
    else alert("더 이상 삭제할 수 없습니다.");
  }

  return (
    <div className="container">
      {/* 화면 전체를 Routes로 교체하여 URL에 따라 다른 페이지를 보여줌 */}
      <Routes>
        <Route 
          path="/" 
          element={
            <ListPage 
              lions={lions} 
              setLions={setLions}
              apiStatus={apiStatus}
              handleFetch={handleFetch}
              removeLion={removeLion}
            />
          } 
        />
        <Route 
          path="/lion/:id" 
          element={<DetailPage lions={lions} />} 
        />
      </Routes>
    </div>
  );
}

export default App;