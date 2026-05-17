import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

function useFilter(members) {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL에서 초기값 읽어오기
  const filterPart = searchParams.get('part') || '';
  const filterSort = searchParams.get('sort') || 'newest';
  const filterSearch = searchParams.get('search') || '';

  // 파라미터 변경 함수
  const setFilterPart = (value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set('part', value);
    else next.delete('part');
    setSearchParams(next);
  };

  const setFilterSort = (value) => {
    const next = new URLSearchParams(searchParams);
    if (value && value !== 'newest') next.set('sort', value);
    else next.delete('sort');
    setSearchParams(next);
  };

  const setFilterSearch = (value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set('search', value);
    else next.delete('search');
    setSearchParams(next);
  };

  // 필터링 + 정렬
  const filtered = members
    .filter(m => filterPart ? m.part === filterPart : true)
    .filter(m => filterSearch ? m.name.toLowerCase().includes(filterSearch.toLowerCase()) : true)
    .sort((a, b) => filterSort === 'name' ? a.name.localeCompare(b.name, 'ko') : 0);

  return {
    filtered,
    filterPart, setFilterPart,
    filterSort, setFilterSort,
    filterSearch, setFilterSearch,
  };
}

export default useFilter;