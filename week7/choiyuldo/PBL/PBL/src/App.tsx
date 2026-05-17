// src/App.tsx
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Husigidane from './assets/0001.webp';
import './App.css';
import { fetchRandomLions } from './Api';
import type { Lion, ApiStatus } from './types';

import ListPage from './ListPage';
import DetailPage from './DetailPage';

function App() {
  const [lions, setLions] = useState<Lion[]>([{
    id: Date.now(),
    isMe: true,
    image: Husigidane,
    name: "ME",
    part: "Frontend",
    interests: ["React", "TypeScript"],
    oneLine: "코딩 파트너와 공부 중!",
    contact: { email: "me@example.com" },
    message: "반가워요!"
  }]);

  const [apiStatus, setApiStatus] = useState<ApiStatus>({ text: "준비 완료", color: "black" });

  const handleFetch = async (action: "add" | "replace", count: number) => {
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
      setApiStatus({ text: "실패!", color: "red" });
    }
  };

  useEffect(() => { handleFetch("add", 3); }, []);

  const removeLion = () => {
    if (lions.length > 1) setLions(prev => prev.slice(0, -1));
  };

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<ListPage lions={lions} setLions={setLions} handleFetch={handleFetch} removeLion={removeLion} apiStatus={apiStatus} />} />
        <Route path="/lion/:id" element={<DetailPage lions={lions} />} />
      </Routes>
    </div>
  );
}

export default App;