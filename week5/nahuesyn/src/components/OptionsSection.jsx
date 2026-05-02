function OptionsSection({ partFilter, sortOrder, searchQuery, onPartChange, onSortChange, onSearchChange }) {
  return (
    <section className="options-section">
      <select
        id="part-filter"
        value={partFilter}
        onChange={e => onPartChange(e.target.value)}
      >
        <option value="전체">전체 파트</option>
        <option value="Frontend">Frontend</option>
        <option value="Backend">Backend</option>
        <option value="Design">Design</option>
      </select>
      <select
        id="sort-order"
        value={sortOrder}
        onChange={e => onSortChange(e.target.value)}
      >
        <option value="latest">최신추가순</option>
        <option value="name">이름순</option>
      </select>
      <input
        type="text"
        id="search-input"
        placeholder="이름으로 검색"
        value={searchQuery}
        onChange={e => onSearchChange(e.target.value)}
      />
    </section>
  )
}

export default OptionsSection
