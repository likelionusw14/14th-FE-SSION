import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

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
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const isLoggedIn = !!user;
  const actionDisabled = isLoading || !isLoggedIn;

  return (
    <div className="control-bar">
      <button className="btn btn-add" onClick={onAdd} disabled={!isLoggedIn}>
        ＋ 아기사자 추가
      </button>
      <button className="btn btn-delete" onClick={onDeleteLast} disabled={!isLoggedIn}>
        ✕ 마지막 삭제
      </button>
      <span className="count-text" id="count-text">총 {count}명</span>
      <span id="async-status">{asyncStatus}</span>
      <button onClick={onAddRandom1} disabled={actionDisabled}>랜덤 추가 1명</button>
      <button onClick={onAddRandom5} disabled={actionDisabled}>랜덤 추가 5명</button>
      <button onClick={onRefresh} disabled={actionDisabled}>전체 새로 고침</button>
      {showRetry && <button onClick={onRetry}>재시도</button>}

      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
        {isLoggedIn ? (
          <>
            <span style={{ fontSize: '13px', color: '#555' }}>👤 {user.email}</span>
            <button onClick={signOut}>로그아웃</button>
          </>
        ) : (
          <>
            <span style={{ fontSize: '13px', color: '#888' }}>로그인하면 명단을 수정할 수 있어요</span>
            <button onClick={() => navigate('/login')}>로그인</button>
          </>
        )}
      </div>
    </div>
  );
}

export default ControlBar;
