function ViewOptions({ filterPart, filterSort, filterSearch, onPartChange, onSortChange, onSearchChange }) {
  return (
    <div className="view-options">
      <select id="filter-part" value={filterPart} onChange={e => onPartChange(e.target.value)}>
        <option value="">전체</option>
        <option value="Frontend">FrontEnd</option>
        <option value="Backend">Backend</option>
        <option value="Design">Design</option>
      </select>
      <select id="filter-sort" value={filterSort} onChange={e => onSortChange(e.target.value)}>
        <option value="newest">최신 추가순</option>
        <option value="name">이름순</option>
      </select>
      <input
        type="text"
        id="filter-search"
        placeholder="이름 검색..."
        value={filterSearch}
        onChange={e => onSearchChange(e.target.value)}
      />
    </div>
  );
}

export default ViewOptions;
