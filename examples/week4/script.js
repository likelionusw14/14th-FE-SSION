// ====== 멋사 출석부 ======

// 데이터
const members = [
  { id: 1, name: '김사자', present: false },
  { id: 2, name: '이사자', present: true },
  { id: 3, name: '박사자', present: false },
];
let currentFilter = 'all';  // 'all' | 'present' | 'absent'

// DOM 참조
const listEl = document.getElementById('member-list');
const presentCountEl = document.getElementById('present-count');
const totalCountEl = document.getElementById('total-count');
const nameInput = document.getElementById('name-input');
const addBtn = document.getElementById('add-btn');
const filterBtns = document.querySelectorAll('.filter-btn');


// ============================================
// render 함수
// ============================================
function render() {
  // === 1단계: 멤버 목록 그리기 ===
  // 1) 매번 비우고 다시 그리기
  // 2) currentFilter에 따라 보여줄 멤버 결정
  // 3) forEach로 li 만들어서 붙이기 (이름과 상태(✅ / ⬜) 안에 넣기)
  // 4) 출석 상태에 따라 스타일 적용 (classList 사용)
  
  

  // === 2단계: 클릭 토글 ===
  // 1) 위 forEach 안에서, click 핸들러 추가
  // 2) 토글 후 render() 다시 호출
  
  
  
  // === 5단계: 통계 업데이트 ===
  // 1) totalCountEl, presentCountEl 활용
  // 2) 출석 여부(present)를 기준으로 값 계산
  
  
}


// ============================================
// 3단계: 멤버 추가
// ============================================
addBtn.addEventListener('click', () => {
  // 1) 추가 버튼 클릭 이벤트 추가, input값 가져오기
  // 2) 빈 문자열이면 무시 (trim 후 체크)
  // 3) members 배열에 새 멤버 추가
  // 4) input 비우기
  // 5) render() 호출
  
  // 선택) Enter 키로도 추가 가능
  
});


// ============================================
// 4단계: 필터 버튼
// ============================================
filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    // 1) 필터 상태 변경(data-filter 값 가져오기)
    // 2) 모든 버튼에서 active 클래스 제거
    // 3) 현재 버튼만 active 클래스 추가

    // render() 호출
    
    
  });
});


render();
