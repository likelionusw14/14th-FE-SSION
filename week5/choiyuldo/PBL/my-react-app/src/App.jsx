import { useState,useMemo} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Husigidane from './assets/0001.webp'
import './App.css'
import DetailCard from './DetailCard.jsx'
import SummaryCard from './SummaryCard.jsx'
import InputForm from './InputForm.jsx'
import { fetchRandomLions } from './Api.jsx';
function App() {
  const [count, setCount] = useState(0)
  const [lions,setLions] = useState([{
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
  




  const [currentFilter,setCurrentFilter] = useState("All");
  const [currentSort,setCurrentSort] = useState("newest");
  const [currentSearch,setCurrentSearch] = useState("");
  const [lastFetchData,setLastFetchData] = useState(null);
  const [showForm,setShowForm] = useState(false);
  const [apiStatus,setApiStatus] = useState({text : "준비 완료", color: "black", isError: false});
  const handleFetch = async (action,count) => {
    try {
      setApiStatus({ text: "로딩 중...", color: "blue" });
      
      // 분리한 api 함수 호출
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
  


  // 데이터 처리
  const getProcessedLions = useMemo(() => {
    let processed = [...lions];
    if (currentSearch){
      processed = processed.filter((lion) => lion.name.toLowerCase().includes(currentSearch.toLowerCase()));
    }
    //.toLowerCase()는 대문자 -> 소문자/.includes() 찾을 문자열을 true/false로 반환
    //-> 즉 lions배열에서 현재 찾는 검색어를 전부 소문자로 변환후 찾는 과정
    if (currentFilter != "All"){
      processed = processed.filter((lion) => lion.part === currentFilter);
    }
    if (currentSort === "name"){
      processed.sort((a,b) => a.name.localeCompare(b.name));
    }
    else{
      processed.sort((a,b) => b.id - a.id);
    }
    return processed;


    
  },[lions,currentFilter,currentSort,currentSearch]);
  const removeLion = () => {
    if (lions.length >1) setLions(prev => prev.slice(0,-1));
    else alert("더 이상 삭제할 수 없습니다.");
  }
  
  
  
  
  
  
  
  
  
  
  
  return(
    <div className="container">
      {/* 상단 컨트롤 영역:버튼 필터 검색 */}
      <section className = "control-section">
        {/* API 컨트롤 버튼 */}
        <div className = "api-controls">
          <button onClick = {() => setShowForm(true)}>
            {showForm ? "폼 닫기" : "사자 추가 폼"}
          </button>
          <button onClick = {() => {removeLion()}}>마지막사자 삭제</button>
          <button onClick={() => handleFetch("add", 1)}>랜덤 1명 추가</button>
          <button onClick={() => handleFetch("refresh", 3)}>전체 교체 (3명)</button>
        </div>
        <div className="status-display">
          <span style={{ color: apiStatus.color }}>상태: {apiStatus.text}</span>
        </div>
        {/* 3단: 직접 추가/삭제 버튼 및 인원수 */}
        <div className="local-controls">
          <button className="black-btn" onClick={() => setShowForm(!showForm)}>
            직접 아기 사자 추가
          </button>
          <button className="black-btn" onClick={removeLion}>
            마지막 삭제
          </button>
          <span id="totalCount">총 {lions.length}명</span>
        </div>
        
      
        <div className ="view-options">
            <select value={currentFilter} onChange={(e)=> setCurrentFilter(e.target.value)}>
              <option value="All">전체</option>
              <option value="Frontend">프론트엔드</option>
              <option value="Backend">백엔드</option>
              <option value="Design">디자인</option>
            </select>
            {/* 정렬 옵션 */}
            <select value={currentSort} onChange={(e) => setCurrentSort(e.target.value)}>
              <option value="newest">최신순</option>
              <option value="name">이름순</option>
            </select>
            {/* 실시간 이름 검색 */}
            <input
              type="text"
              placeholder="이름으로 검색..."
              value={currentSearch}
              onChange={(e) => setCurrentSearch(e.target.value)}
            />

          </div>
      </section>
      {/* 사자 추가 폼 */}
      {showForm && (<InputForm
        lions = {lions}
        setLions = {setLions}
        setShowForm = {setShowForm}
      />
      )}
      {/* 3. 요약 카드 섹션[cite: 3, 4] */}
      <div className="section-header">
        
      </div>

      <div className="card-grid">
        {getProcessedLions.length > 0 ? (
          getProcessedLions.map((lion) => (
            <SummaryCard key={lion.id} lion={lion} />
          ))
      ) : (
          <div className="empty-state">검색 결과가 없습니다.</div>
      )}
    </div>
    {/* 상세 카드 섹션 */}
    <section className = "detail-section">
      <h2>상세 보기</h2>
      <div className="detail-list" style={{marginTop: "40px"}}>
        {getProcessedLions.map((lion) => (
          <DetailCard key = {lion.id} lion={lion}/>
        ))}
      </div>
    </section>
      
    </div>
  );
}

export default App
