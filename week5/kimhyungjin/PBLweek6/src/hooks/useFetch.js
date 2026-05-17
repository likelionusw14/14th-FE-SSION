import { useState } from 'react';

let nextId = 10; // 기존 lions가 9명이라서

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
function useFetch(setMembers) {
  const [asyncStatus, setAsyncStatus] = useState('✅ 준비 완료');
  const [showRetry, setShowRetry] = useState(false);
  const [lastAction, setLastAction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const setStatus = (status) => {
    if (status === 'idle')    { setAsyncStatus('✅ 준비 완료'); setShowRetry(false); setIsLoading(false); }
    if (status === 'loading') { setAsyncStatus('⏳ 불러오는 중...'); setShowRetry(false); setIsLoading(true); }
    if (status === 'error')   { setAsyncStatus('❌ 실패'); setShowRetry(true); setIsLoading(false); }
  };

  const fetchUsers = async (count) => {
    const res = await fetch('https://randomuser.me/api/?results=' + count);
    const data = await res.json();
    return data.results;
  };

  const handleAddRandom = async (count) => {
    setLastAction(count === 1 ? 'add1' : 'add5');
    setStatus('loading');
    try {
      const users = await fetchUsers(count);
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
      const users = await fetchUsers(9);
      const newMembers = users.map(apiUserToMember);
      setMembers(newMembers);
      setStatus('idle');
    } catch {
      setStatus('error');
    }
  };

  const handleRetry = () => {
    if (lastAction === 'add1')     handleAddRandom(1);
    else if (lastAction === 'add5')     handleAddRandom(5);
    else if (lastAction === 'refresh') handleRefresh();
  };

  return {
    asyncStatus,
    showRetry,
    isLoading,
    handleAddRandom,
    handleRefresh,
    handleRetry,
  };
}

export default useFetch;