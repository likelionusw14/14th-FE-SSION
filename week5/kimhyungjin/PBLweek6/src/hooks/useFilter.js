import { useState } from 'react';

function useFilter(members) {
  const [filterPart, setFilterPart] = useState('');
  const [filterSort, setFilterSort] = useState('newest');
  const [filterSearch, setFilterSearch] = useState('');

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