import { useState, useEffect } from 'react';
import initialLions from '../data/lions.js';
import ControlBar from '../components/ControlBar.jsx';
import ViewOptions from '../components/ViewOptions.jsx';
import AddForm from '../components/AddForm.jsx';
import SummaryCard from '../components/SummaryCard.jsx';
import useFilter from '../hooks/useFilter.js';
import useFetch from '../hooks/useFetch.js';
import '../styles/style.css';

function ListPage() {
  const [members, setMembers] = useState([]);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    setMembers(initialLions);
  }, []);

  const {
    asyncStatus, showRetry, isLoading,
    handleAddRandom, handleRefresh, handleRetry,
  } = useFetch(setMembers);

  const {
    filtered,
    filterPart, setFilterPart,
    filterSort, setFilterSort,
    filterSearch, setFilterSearch,
  } = useFilter(members);

  const handleAddMember = (newMember) => {
    setMembers(prev => [...prev, newMember]);
    setFormOpen(false);
  };

  const handleDeleteLast = () => {
    setMembers(prev => prev.slice(0, -1));
  };

  return (
    <div className="wrapper">
      <ControlBar
        count={members.length}
        onAdd={() => setFormOpen(prev => !prev)}
        onDeleteLast={handleDeleteLast}
        asyncStatus={asyncStatus}
        onAddRandom1={() => handleAddRandom(1)}
        onAddRandom5={() => handleAddRandom(5)}
        onRefresh={handleRefresh}
        onRetry={handleRetry}
        showRetry={showRetry}
        isLoading={isLoading}
      />
      <ViewOptions
        filterPart={filterPart}
        filterSort={filterSort}
        filterSearch={filterSearch}
        onPartChange={setFilterPart}
        onSortChange={setFilterSort}
        onSearchChange={setFilterSearch}
      />
      <AddForm
        isOpen={formOpen}
        onSubmit={handleAddMember}
        onCancel={() => setFormOpen(false)}
      />
      <div className="card-grid">
        {filtered.length === 0
          ? <p>🔍 조건에 맞는 아기사자가 없습니다.</p>
          : filtered.map(m => <SummaryCard key={m.id} member={m} />)
        }
      </div>
    </div>
  );
}

export default ListPage;