import { useState } from 'react'

export default function ControlBar({
  total,
  onOpenForm,
  onDeleteLast,
  onAddRandom1,
  onAddRandom5,
  onRefreshAll,
  statusText,
  status,
  isLoading,
  onRetry,
  partFilter, setPartFilter,
  sortBy, setSortBy,
  searchQuery, setSearchQuery,
}) {
  return (
    <div className="control-bar">
      {/* 명단 조작 영역 */}
      <div className="control-row">
        <button className="btn btn-primary" onClick={onOpenForm}>
          아기 사자 추가
        </button>
        <button className="btn btn-danger" onClick={onDeleteLast}>
          마지막 아기 사자 삭제
        </button>
        <span className="total-count">총 {total}명</span>
      </div>

      {/* 외부 데이터 영역 */}
      <div className="control-row">
        <button className="btn btn-secondary" onClick={onAddRandom1} disabled={isLoading}>
          랜덤 1명 추가
        </button>
        <button className="btn btn-secondary" onClick={onAddRandom5} disabled={isLoading}>
          랜덤 5명 추가
        </button>
        <button className="btn btn-secondary" onClick={onRefreshAll} disabled={isLoading}>
          전체 새로고침
        </button>
        <span className={`status-text status-${status}`}>{statusText}</span>
        {status === 'error' && (
          <button className="btn btn-retry" onClick={onRetry}>
            재시도
          </button>
        )}
      </div>

      {/* 보기 옵션 영역 */}
      <div className="control-row view-options">
        <label>파트</label>
        <select value={partFilter} onChange={(e) => setPartFilter(e.target.value)}>
          <option>전체</option>
          <option>Frontend</option>
          <option>Backend</option>
          <option>Design</option>
        </select>

        <label>정렬</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option>최신추가순</option>
          <option>이름순</option>
        </select>

        <label>검색</label>
        <input
          type="text"
          placeholder="이름으로 검색"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  )
}
