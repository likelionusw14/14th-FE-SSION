import { useState, useEffect, useCallback } from 'react';
import ControlBar from '../components/ControlBar';
import ViewOptions from '../components/ViewOptions';
import AddForm from '../components/AddForm';
import SummaryCard from '../components/SummaryCard';
import useFilter from '../hooks/useFilter';
import useFetch from '../hooks/useFetch';
import { Member, DbMember, dbToMember, memberToDb } from '../types';
import { supabase } from '../lib/supabase';
import '../styles/style.css';

function ListPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [pageLoading, setPageLoading] = useState<boolean>(true);

  const fetchMembers = useCallback(async (): Promise<void> => {
    const { data, error } = await supabase
      .from('lions')
      .select('*')
      .order('id');
    if (!error && data) {
      setMembers((data as DbMember[]).map(dbToMember));
    }
    setPageLoading(false);
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const {
    asyncStatus, showRetry, isLoading,
    handleAddRandom, handleRefresh, handleRetry,
  } = useFetch(fetchMembers);

  const {
    filtered,
    filterPart, setFilterPart,
    filterSort, setFilterSort,
    filterSearch, setFilterSearch,
  } = useFilter(members);

  const handleAddMember = async (newMember: Omit<Member, 'id'>): Promise<void> => {
    const { error } = await supabase.from('lions').insert([memberToDb(newMember)]);
    if (!error) {
      await fetchMembers();
      setFormOpen(false);
    }
  };

  const handleDeleteLast = async (): Promise<void> => {
    if (members.length === 0) return;
    const lastId = members[members.length - 1].id;
    await supabase.from('lions').delete().eq('id', lastId);
    await fetchMembers();
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
        {pageLoading
          ? <p>⏳ 불러오는 중...</p>
          : filtered.length === 0
            ? <p>🔍 조건에 맞는 아기사자가 없습니다.</p>
            : filtered.map(m => <SummaryCard key={m.id} member={m} />)
        }
      </div>
    </div>
  );
}

export default ListPage;
