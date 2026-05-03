// src/components/ViewOptions.jsx

function ViewOptions() {
  return (
    <section className="control-bar">
      <select className="form-input form-select" defaultValue="전체">
        <option value="전체">전체</option>
        <option value="Frontend">Frontend</option>
        <option value="Backend">Backend</option>
        <option value="Design">Design</option>
      </select>

      <select className="form-input form-select" defaultValue="latest">
        <option value="latest">최신추가순</option>
        <option value="name">이름순</option>
      </select>

      <input
        className="form-input"
        type="text"
        placeholder="이름 검색..."
        style={{ maxWidth: '180px' }}
      />
    </section>
  )
}

export default ViewOptions
