import { useState } from 'react';
import { Member, RandomApiUser, RandomApiResponse } from '../types';

let nextId = 10;

function apiUserToMember(user: RandomApiUser): Member {
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

type ActionType = 'add1' | 'add5' | 'refresh' | null;

function useFetch(setMembers: React.Dispatch<React.SetStateAction<Member[]>>) {
  const [asyncStatus, setAsyncStatus] = useState<string>('✅ 준비 완료');
  const [showRetry, setShowRetry] = useState<boolean>(false);
  const [lastAction, setLastAction] = useState<ActionType>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setStatus = (status: 'idle' | 'loading' | 'error') => {
    if (status === 'idle')    { setAsyncStatus('✅ 준비 완료'); setShowRetry(false); setIsLoading(false); }
    if (status === 'loading') { setAsyncStatus('⏳ 불러오는 중...'); setShowRetry(false); setIsLoading(true); }
    if (status === 'error')   { setAsyncStatus('❌ 실패'); setShowRetry(true); setIsLoading(false); }
  };

  const fetchUsers = async (count: number): Promise<RandomApiUser[]> => {
    const res = await fetch('https://randomuser.me/api/?results=' + count);
    const data: RandomApiResponse = await res.json();
    return data.results;
  };

  const handleAddRandom = async (count: number): Promise<void> => {
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

  const handleRefresh = async (): Promise<void> => {
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

  const handleRetry = (): void => {
    if (lastAction === 'add1')      handleAddRandom(1);
    else if (lastAction === 'add5') handleAddRandom(5);
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
