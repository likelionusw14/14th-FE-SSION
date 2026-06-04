function ControlSection({
  total,
  apiStatus,
  showRetry,
  onToggleForm,
  onDeleteLast,
  onFetch1,
  onFetch5,
  onRefreshAll,
  onRetry,
}) {
  return (
    <section className="control-section">
      <div className="control-group">
        <div className="control-buttons">
          <button id="toggle-form-btn" onClick={onToggleForm}>
            아기 사자 추가
          </button>
          <button id="delete-last-btn" onClick={onDeleteLast}>
            마지막 아기 사자 삭제
          </button>
        </div>
        <div className="api-buttons">
          <button onClick={onFetch1}>랜덤 1명 추가</button>
          <button onClick={onFetch5}>랜덤 5명 추가</button>
          <button onClick={onRefreshAll}>전체 새로고침</button>
        </div>
      </div>
      <div className="status-info">
        <span id="api-status">{apiStatus}</span>
        <button className={showRetry ? '' : 'hidden'} onClick={onRetry}>
          재시도
        </button>
        <span id="total-count">총 {total}명</span>
      </div>
    </section>
  )
}

export default ControlSection
