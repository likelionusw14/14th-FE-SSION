import { useSearchParams } from 'react-router-dom';
import { Member } from '../types';

function useFilter(members: Member[]) {
  const [searchParams, setSearchParams] = useSearchParams();

  const filterPart = searchParams.get('part') ?? '';
  const filterSort = searchParams.get('sort') ?? 'newest';
  const filterSearch = searchParams.get('search') ?? '';

  const setFilterPart = (value: string): void => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set('part', value);
    else next.delete('part');
    setSearchParams(next);
  };

  const setFilterSort = (value: string): void => {
    const next = new URLSearchParams(searchParams);
    if (value && value !== 'newest') next.set('sort', value);
    else next.delete('sort');
    setSearchParams(next);
  };

  const setFilterSearch = (value: string): void => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set('search', value);
    else next.delete('search');
    setSearchParams(next);
  };

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
