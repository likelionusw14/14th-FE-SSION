import { useState } from 'react';
import { RandomApiUser, RandomApiResponse } from '../types';
import { supabase } from '../lib/supabase';

function apiUserToDb(user: RandomApiUser) {
  return {
    name: user.name.first + ' ' + user.name.last,
    part: 'Frontend',
    skills: ['JavaScript', 'HTML', 'CSS'],
    short_intro: '랜덤으로 추가된 멤버',
    intro: '소개 없음',
    phone: user.phone,
    email: user.email,
    img_src: user.picture.medium,
    website: '',
    quote: '',
    is_mine: false,
    org: '멋쟁이사자처럼',
  };
}

type ActionType = 'add1' | 'add5' | 'refresh' | null;

function useFetch(refetch: () => Promise<void>) {
  const [asyncStatus, setAsyncStatus] = useState<string>('✅ 준비 완료');
  const [showRetry, setShowRetry] = useState<boolean>(false);
  const [lastAction, setLastAction] = useState<ActionType>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setStatus = (status: 'idle' | 'loading' | 'error') => {
    if (status === 'idle')    { setAsyncStatus('✅ 준비 완료'); setShowRetry(false); setIsLoading(false); }
    if (status === 'loading') { setAsyncStatus('⏳ 불러오는 중...'); setShowRetry(false); setIsLoading(true); }
    if (status === 'error')   { setAsyncStatus('❌ 실패'); setShowRetry(true); setIsLoading(false); }
  };

  const fetchRandomUsers = async (count: number): Promise<RandomApiUser[]> => {
    const res = await fetch('https://randomuser.me/api/?results=' + count);
    const data: RandomApiResponse = await res.json();
    return data.results;
  };

  const handleAddRandom = async (count: number): Promise<void> => {
    setLastAction(count === 1 ? 'add1' : 'add5');
    setStatus('loading');
    try {
      const users = await fetchRandomUsers(count);
      const rows = users.map(apiUserToDb);
      const { error } = await supabase.from('lions').insert(rows);
      if (error) throw error;
      await refetch();
      setStatus('idle');
    } catch {
      setStatus('error');
    }
  };

  const handleRefresh = async (): Promise<void> => {
    setLastAction('refresh');
    setStatus('loading');
    try {
      const { error: deleteError } = await supabase.from('lions').delete().gt('id', 0);
      if (deleteError) throw deleteError;
      const users = await fetchRandomUsers(9);
      const rows = users.map(apiUserToDb);
      const { error: insertError } = await supabase.from('lions').insert(rows);
      if (insertError) throw insertError;
      await refetch();
      setStatus('idle');
    } catch {
      setStatus('error');
    }
  };

  const handleRetry = (): void => {
    if (lastAction === 'add1')          handleAddRandom(1);
    else if (lastAction === 'add5')     handleAddRandom(5);
    else if (lastAction === 'refresh')  handleRefresh();
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
