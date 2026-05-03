// src/components/ControlBar.jsx

function ControlBar({ totalCount }) {
  return (
    <section className="control-bar">
      <button className="btn btn--primary">아기 사자 추가</button>
      <button className="btn btn--default">마지막 아기 사자 삭제</button>
      <span className="total-count" id="total-count">총 {totalCount}명</span>

      <button className="btn btn--default">랜덤 1명 추가</button>
      <button className="btn btn--default">랜덤 5명 추가</button>
      <button className="btn btn--default">전체 새로고침</button>
      <span className="total-count">준비 완료</span>
    </section>
  )
}

export default ControlBar
