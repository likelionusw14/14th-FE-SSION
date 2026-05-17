import { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/style.css';

type Mode = 'login' | 'signup';

function LoginPage() {
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setSubmitting(true);

    if (mode === 'login') {
      const { error } = await signIn(email, password);
      if (error) {
        setErrorMsg(error);
      } else {
        navigate('/');
      }
    } else {
      const { error } = await signUp(email, password);
      if (error) {
        setErrorMsg(error);
      } else {
        setSuccessMsg('회원가입 완료! 이메일 인증 후 로그인하거나, 바로 로그인해 보세요.');
      }
    }

    setSubmitting(false);
  };

  const switchMode = (next: Mode): void => {
    setMode(next);
    setErrorMsg('');
    setSuccessMsg('');
  };

  return (
    <div className="wrapper">
      <div style={{ maxWidth: '400px', margin: '80px auto' }}>
        <h2 style={{ marginBottom: '24px' }}>🦁 아기사자 대시보드</h2>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          <button
            onClick={() => switchMode('login')}
            style={{ fontWeight: mode === 'login' ? 'bold' : 'normal', flex: 1 }}
          >
            로그인
          </button>
          <button
            onClick={() => switchMode('signup')}
            style={{ fontWeight: mode === 'signup' ? 'bold' : 'normal', flex: 1 }}
          >
            회원가입
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label htmlFor="login-email">이메일</label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="example@email.com"
              required
            />
          </div>
          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label htmlFor="login-password">비밀번호</label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="6자 이상"
              required
            />
          </div>

          {errorMsg && (
            <p style={{ color: '#e53e3e', marginBottom: '12px', fontSize: '14px' }}>
              ❌ {errorMsg}
            </p>
          )}
          {successMsg && (
            <p style={{ color: '#38a169', marginBottom: '12px', fontSize: '14px' }}>
              ✅ {successMsg}
            </p>
          )}

          <button
            type="submit"
            className="btn btn-add"
            style={{ width: '100%' }}
            disabled={submitting}
          >
            {submitting ? '처리 중...' : mode === 'login' ? '로그인' : '회원가입'}
          </button>
        </form>

        <button
          onClick={() => navigate('/')}
          style={{ marginTop: '20px', background: 'none', border: 'none', cursor: 'pointer', color: '#888', fontSize: '14px' }}
        >
          ← 목록으로 돌아가기
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
