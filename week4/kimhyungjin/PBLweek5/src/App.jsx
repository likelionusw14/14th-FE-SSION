import { useState } from 'react';
import initialLions from './data/lions.js';
import ControlBar from './components/ControlBar.jsx';
import ViewOptions from './components/ViewOptions.jsx';
import AddForm from './components/AddForm.jsx';
import SummaryCard from './components/SummaryCard.jsx';
import DetailItem from './components/DetailItem.jsx';
import './styles/style.css';

let nextId = initialLions.length + 1;

function apiUserToMember(user) {
  return {
    id: nextId++,
    name: user.name.first + ' ' + user.name.last,
    part: 'Frontend',
    skills: ['JavaScript', 'HTML', 'CSS'],
    shortIntro: '랜덤으로 추가된 멤버',
    intro: '소개 없음',
    phone: user.phone,
    email: user.email,
    imgSrc: user.picture.medium,
    website: '',
    quote: '',
    isMine: false,
    org: '멋쟁이사자처럼',
  };
}

async function fetchRandomUsers(count) {
  const res = await fetch('https://randomuser.me/api/?results=' + count);
  const data = await res.json();
  return data.results;
}

function App() {
  const [members, setMembers] = useState(initialLions);
  const [formOpen, setFormOpen] = useState(false);
  const [asyncStatus, setAsyncStatus] = useState('✅ 준비 완료');
  const [showRetry, setShowRetry] = useState(false);
  const [lastAction, setLastAction] = useState(null);

  // 필터 상태 (UI only - 실제 필터링도 구현)
  const [filterPart, setFilterPart] = useState('');
  const [filterSort, setFilterSort] = useState('newest');
  const [filterSearch, setFilterSearch] = useState('');

  const setStatus = (status) => {
    if (status === 'idle')    { setAsyncStatus('✅ 준비 완료'); setShowRetry(false); }
    if (status === 'loading') { setAsyncStatus('⏳ 불러오는 중...'); setShowRetry(false); }
    if (status === 'error')   { setAsyncStatus('❌ 실패'); setShowRetry(true); }
  };

  const handleAddMember = (newMember) => {
    setMembers(prev => [...prev, { ...newMember, id: nextId++ }]);
    setFormOpen(false);
  };

  const handleDeleteLast = () => {
    setMembers(prev => prev.slice(0, -1));
  };

  const handleAddRandom = async (count) => {
    const action = count === 1 ? 'add1' : 'add5';
    setLastAction(action);
    setStatus('loading');
    try {
      const users = await fetchRandomUsers(count);
      const newMembers = users.map(apiUserToMember);
      setMembers(prev => [...prev, ...newMembers]);
      setStatus('idle');
    } catch {
      setStatus('error');
    }
  };

  const handleRefresh = async () => {
    setLastAction('refresh');
    setStatus('loading');
    try {
      const users = await fetchRandomUsers(9);
      const newMembers = users.map(apiUserToMember);
      setMembers(newMembers);
      setStatus('idle');
    } catch {
      setStatus('error');
    }
  };

  const handleRetry = () => {
    if (lastAction === 'add1')   handleAddRandom(1);
    else if (lastAction === 'add5')   handleAddRandom(5);
    else if (lastAction === 'refresh') handleRefresh();
  };

  // 필터링 + 정렬
  const getFiltered = () => {
    let result = [...members];
    if (filterPart)   result = result.filter(m => m.part === filterPart);
    if (filterSearch) result = result.filter(m => m.name.toLowerCase().includes(filterSearch.toLowerCase()));
    if (filterSort === 'name') result.sort((a, b) => a.name.localeCompare(b.name, 'ko'));
    return result;
  };

  const filtered = getFiltered();

  return (
    <div className="wrapper">
      <ControlBar
        count={members.length}
        onAdd={() => setFormOpen(prev => !prev)}
        onDeleteLast={handleDeleteLast}
        asyncStatus={asyncStatus}
        onAddRandom1={() => handleAddRandom(1)}
        onAddRandom5={() => handleAddRandom(5)}
        onRefresh={handleRefresh}
        onRetry={handleRetry}
        showRetry={showRetry}
      />

      <ViewOptions
        filterPart={filterPart}
        filterSort={filterSort}
        filterSearch={filterSearch}
        onPartChange={setFilterPart}
        onSortChange={setFilterSort}
        onSearchChange={setFilterSearch}
      />

      <AddForm
        isOpen={formOpen}
        onSubmit={handleAddMember}
        onCancel={() => setFormOpen(false)}
      />

      {/* 중단: 요약 카드 그리드 */}
      <div className="card-grid" id="card-grid">
        {filtered.length === 0
          ? <p>🔍 조건에 맞는 아기사자가 없습니다.</p>
          : filtered.map(m => <SummaryCard key={m.id} member={m} />)
        }
      </div>

      {/* 하단: 상세 자기소개 */}
      <div className="detail-section">
        <h2>📋 상세 자기소개</h2>
        <div className="detail-list" id="detail-list">
          {filtered.length === 0
            ? <p>조건에 맞는 아기사자가 없습니다.</p>
            : filtered.map(m => <DetailItem key={m.id} member={m} />)
          }
        </div>
      </div>
    </div>
  );
}

export default App;
