// ====== 멋사 출석부 정답 ======

const members = [
  { id: 1, name: '김사자', present: false },
  { id: 2, name: '이사자', present: true },
  { id: 3, name: '박사자', present: false },
];
let currentFilter = 'all';

const listEl = document.getElementById('member-list');
const presentCountEl = document.getElementById('present-count');
const totalCountEl = document.getElementById('total-count');
const nameInput = document.getElementById('name-input');
const addBtn = document.getElementById('add-btn');
const filterBtns = document.querySelectorAll('.filter-btn');


function render() {
  // === 1·2단계: 멤버 목록 + 토글 ===
  listEl.innerHTML = '';

  let visibleMembers;
  if (currentFilter === 'all') {
    visibleMembers = members;
  } else if (currentFilter === 'present') {
    visibleMembers = members.filter((m) => m.present);
  } else {
    visibleMembers = members.filter((m) => !m.present);
  }

  if (visibleMembers.length === 0) {
    listEl.innerHTML = '<div class="empty">표시할 멤버가 없어요 🦁</div>';
  } else {
    visibleMembers.forEach((member) => {
      const li = document.createElement('li');
      if (member.present) li.classList.add('present');
      
      li.innerHTML = `
        <span>${member.name}</span>
        <span class="member-status">${member.present ? '✅' : '⬜'}</span>
      `;

      li.addEventListener('click', () => {
        member.present = !member.present;
        render();
      });
      
      listEl.appendChild(li);
    });
  }

  // 5단계: 통계 업데이트
  totalCountEl.textContent = members.length;
  presentCountEl.textContent = members.filter((m) => m.present).length;
}


// === 3단계: 멤버 추가 ===
addBtn.addEventListener('click', () => {
  const name = nameInput.value.trim();
  if (name === '') return;

  members.push({
    id: Date.now(),
    name: name,
    present: false,
  });

  nameInput.value = '';
  render();
});

nameInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addBtn.click();
});


// === 4단계: 필터 ===
filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    currentFilter = btn.dataset.filter;
    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    render();
  });
});


render();
