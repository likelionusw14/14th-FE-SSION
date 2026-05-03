// src/components/AddForm.jsx

function AddForm() {
  return (
    <section className="form-section hidden" id="form-section">
      <div className="form-grid">
        <div className="form-field">
          <label className="form-label" htmlFor="input-name">이름</label>
          <input className="form-input" type="text" id="input-name" placeholder="예: 홍아기사자" />
        </div>
        <div className="form-field">
          <label className="form-label" htmlFor="input-part">파트</label>
          <select className="form-input form-select" id="input-part" defaultValue="Frontend">
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Design">Design</option>
          </select>
        </div>
        <div className="form-field form-field--full">
          <label className="form-label" htmlFor="input-skills">관심 기술 (쉼표로 구분)</label>
          <input className="form-input" type="text" id="input-skills" placeholder="예: JavaScript, React, HTML/CSS" />
        </div>
        <div className="form-field form-field--full">
          <label className="form-label" htmlFor="input-bio">한 줄 소개 (요약 카드)</label>
          <input className="form-input" type="text" id="input-bio" placeholder="예: 3주차 DOM 조작 연습 중!" />
        </div>
        <div className="form-field form-field--full">
          <label className="form-label" htmlFor="input-intro">자기소개 (상세 카드)</label>
          <textarea
            className="form-input form-textarea"
            id="input-intro"
            placeholder="예: HTML/CSS로 구조를 만들고, JS로 데이터를 바꾸면 화면이 바뀌는 경험을 하고 있습니다."
          />
        </div>
        <div className="form-field">
          <label className="form-label" htmlFor="input-email">Email</label>
          <input className="form-input" type="email" id="input-email" placeholder="예: lion@example.com" />
        </div>
        <div className="form-field">
          <label className="form-label" htmlFor="input-phone">Phone</label>
          <input className="form-input" type="text" id="input-phone" placeholder="예: 010-1234-5678" />
        </div>
        <div className="form-field form-field--full">
          <label className="form-label" htmlFor="input-website">Website</label>
          <input className="form-input" type="url" id="input-website" placeholder="예: https://example.com" />
        </div>
        <div className="form-field form-field--full">
          <label className="form-label" htmlFor="input-comment">한 마디</label>
          <input className="form-input" type="text" id="input-comment" placeholder="예: 데이터 바꾸면 화면도 바뀐다!" />
        </div>
      </div>
      <div className="form-actions">
        <button className="btn btn--default">랜덤 값 채우기</button>
        <button className="btn btn--primary">추가하기</button>
        <button className="btn btn--default">취소</button>
      </div>
    </section>
  )
}

export default AddForm
