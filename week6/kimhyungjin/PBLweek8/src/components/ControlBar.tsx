interface ControlBarProps {
  count: number;
  onAdd: () => void;
  onDeleteLast: () => void;
  asyncStatus: string;
  onAddRandom1: () => void;
  onAddRandom5: () => void;
  onRefresh: () => void;
  onRetry: () => void;
  showRetry: boolean;
  isLoading: boolean;
}

function ControlBar({
  count, onAdd, onDeleteLast, asyncStatus,
  onAddRandom1, onAddRandom5, onRefresh, onRetry,
  showRetry, isLoading,
}: ControlBarProps) {
  return (
    <div className="control-bar">
      <button className="btn btn-add" onClick={onAdd}>＋ 아기사자 추가</button>
      <button className="btn btn-delete" onClick={onDeleteLast}>✕ 마지막 삭제</button>
      <span className="count-text" id="count-text">총 {count}명</span>
      <span id="async-status">{asyncStatus}</span>
      <button onClick={onAddRandom1} disabled={isLoading}>랜덤 추가 1명</button>
      <button onClick={onAddRandom5} disabled={isLoading}>랜덤 추가 5명</button>
      <button onClick={onRefresh} disabled={isLoading}>전체 새로 고침</button>
      {showRetry && <button onClick={onRetry}>재시도</button>}
    </div>
  );
}

export default ControlBar;
