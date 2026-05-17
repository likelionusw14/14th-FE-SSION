import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SummaryCard from './SummaryCard';
import InputForm from './InputForm';
import type { Lion, ApiStatus } from './types';

interface ListPageProps {
  lions: Lion[];
  setLions: React.Dispatch<React.SetStateAction<Lion[]>>;
  handleFetch: (action: "add" | "replace", count: number) => Promise<void>;
  removeLion: () => void;
  apiStatus: ApiStatus;
}

function ListPage({ lions, setLions, handleFetch, removeLion, apiStatus }: ListPageProps) {
  const [showForm, setShowForm] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const currentFilter = searchParams.get('part') || 'All';
  const currentSort = searchParams.get('sort') || 'newest';
  const currentSearch = searchParams.get('search') || '';

  const updateParams = (key: string, value: string) => {
    searchParams.set(key, value);
    setSearchParams(searchParams);
  };

  const getProcessedLions = useMemo((): Lion[] => {
    let processed = [...lions];
    if (currentSearch) {
      processed = processed.filter(l => l.name.toLowerCase().includes(currentSearch.toLowerCase()));
    }
    if (currentFilter !== "All") {
      processed = processed.filter(l => l.part === currentFilter);
    }
    currentSort === "name" 
      ? processed.sort((a, b) => a.name.localeCompare(b.name))
      : processed.sort((a, b) => b.id - a.id);
    return processed;
  }, [lions, currentFilter, currentSort, currentSearch]);

  return (
    <>
      <section className="control-section">
        <div className="api-controls">
          <button onClick={() => setShowForm(!showForm)}>사자 추가 폼</button>
          <button onClick={removeLion}>마지막 삭제</button>
          <button onClick={() => handleFetch("add", 1)}>랜덤 1명 추가</button>
        </div>
        
        <div className="status-display">
          <span style={{ color: apiStatus.color }}>상태: {apiStatus.text}</span>
          <span id="totalCount">총 {lions.length}명</span>
        </div>

        <div className="view-options">
          <select value={currentFilter} onChange={(e) => updateParams('part', e.target.value)}>
            <option value="All">전체</option>
            <option value="Frontend">프론트엔드</option>
            <option value="Backend">백엔드</option>
            <option value="Design">디자인</option>
          </select>
          <select value={currentSort} onChange={(e) => updateParams('sort', e.target.value)}>
            <option value="newest">최신순</option>
            <option value="name">이름순</option>
          </select>
          <input
            type="text"
            placeholder="이름으로 검색..."
            value={currentSearch}
            onChange={(e) => updateParams('search', e.target.value)}
          />
        </div>
      </section>

      {showForm && <InputForm lions={lions} setLions={setLions} setShowForm={setShowForm} />}

      <div className="card-grid">
        {getProcessedLions.map(lion => (
          <SummaryCard key={lion.id} lion={lion} />
        ))}
      </div>
    </>
  );
}

export default ListPage;