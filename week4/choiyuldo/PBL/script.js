/* =====================
   1. 데이터 상태 관리
===================== */
const lions = [
  {
    id: Date.now(),
    isMe: true,
    name: "ME",
    part: "Frontend",
    interests: ["HTML / CSS", "JavaScript", "React"],
    oneLine: "구조 잡는 걸 좋아합니다",
    intro: "안정적인 화면 구성이 목표입니다.",
    contact: { email: "example@mail.com", phone: "010-0000-0000", site: "https://github.com" },
    message: "즐겁게 성장하고 싶어요!"
  }
];

let currentFilter = "All";
let currentSort = "newest";
let currentSearch = "";
let lastFetchData = null;

/* =====================
   2. DOM 요소 가져오기
===================== */
const summaryGrid = document.getElementById("summaryGrid");
const detailList = document.getElementById("detailList");
const totalCount = document.getElementById("totalCount");
const formSection = document.getElementById("formSection");
const lionForm = document.getElementById("lionForm");

// 버튼들
const addBtn = document.getElementById("addBtn");
const removeBtn = document.getElementById("removeBtn");
const cancelBtn = document.getElementById("cancelBtn");
const randomFillBtn = document.getElementById("randomFillBtn");
const addOneRandomBtn = document.getElementById("addOneRandomBtn");
const addFiveRandomBtn = document.getElementById("addFiveRandomBtn");
const refreshAllBtn = document.getElementById("refreshAllBtn");
const retryBtn = document.getElementById("retryBtn");

// 입력 및 옵션
const filterPart = document.getElementById("filterPart");
const sortOption = document.getElementById("sortOption");
const searchInput = document.getElementById("searchInput");
const apiStatusText = document.getElementById("apiStatusText");

/* =====================
   3. 처리 및 렌더링 로직
===================== */
function getProcessedLions() {
  let processed = [...lions];
  if (currentSearch) {
    processed = processed.filter(lion => lion.name.toLowerCase().includes(currentSearch.toLowerCase()));
  }
  if (currentFilter !== "All") {
    processed = processed.filter(lion => lion.part === currentFilter);
  }
  if (currentSort === "name") {
    processed.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    processed.sort((a, b) => b.id - a.id);
  }
  return processed;
}

function renderAll() {
  const displayData = getProcessedLions();
  totalCount.textContent = `총 ${lions.length}명`;

  // 요약 카드 렌더링
  summaryGrid.innerHTML = displayData.length === 0 ? '<p>결과가 없습니다.</p>' : "";
  displayData.forEach(lion => {
    const card = document.createElement("article");
    card.className = `summary-card ${lion.isMe ? 'me' : ''}`;
    card.innerHTML = `
      <div class="image-wrapper">
        <img src="img/0001.webp" onerror="this.src='https://via.placeholder.com/150'">
        <span class="badge">${lion.interests[0] || '사자'}</span>
      </div>
      <h3>${lion.name}</h3>
      <p class="part">${lion.part}</p>
      <p class="intro">${lion.oneLine}</p>
    `;
    summaryGrid.appendChild(card);
  });

  // 상세 카드 렌더링
  detailList.innerHTML = displayData.length === 0 ? '<p>결과가 없습니다.</p>' : "";
  displayData.forEach(lion => {
    const card = document.createElement("article");
    card.className = "detail-card";
    card.innerHTML = `
      <h3>${lion.name}</h3>
      <p>${lion.part} · 멋쟁이사자처럼</p>
      <ul>${lion.interests.map(s => `<li>${s}</li>`).join("")}</ul>
      <p>Email: ${lion.contact.email}</p>
      <p>한 마디: ${lion.message}</p>
    `;
    detailList.appendChild(card);
  });
}

/* =====================
   4. API 통신 로직
===================== */
function updateApiStatus(text, isError = false, isLoading = false) {
  apiStatusText.textContent = `상태: ${text}`;
  apiStatusText.style.color = isError ? "red" : (isLoading ? "blue" : "black");
  retryBtn.hidden = !isError;
}

async function executeUserFetch(action, count) {
  lastFetchData = { action, count };
  try {
    updateApiStatus("로딩 중...", false, true);
    const res = await fetch(`https://randomuser.me/api/?results=${count}&nat=us,gb`);
    if (!res.ok) throw new Error("네트워크 오류");
    const data = await res.json();
    
    const newLions = data.results.map(u => ({
      id: Date.now() + Math.random(),
      isMe: false,
      name: `${u.name.first} ${u.name.last}`,
      part: ["Frontend", "Backend", "Design"][Math.floor(Math.random()*3)],
      interests: ["JS", "React", "Design"],
      oneLine: "반갑습니다!",
      intro: "열심히 하겠습니다.",
      contact: { email: u.email, phone: u.cell, site: "#" },
      message: "화이팅!"
    }));

    if (action === "add") lions.push(...newLions);
    else {
      const me = lions.filter(l => l.isMe);
      lions.length = 0;
      lions.push(...me, ...newLions);
    }
    renderAll();
    updateApiStatus("준비 완료");
  } catch (e) {
    updateApiStatus("실패", true);
  }
}

/* =====================
   5. 이벤트 연결
===================== */
document.addEventListener("DOMContentLoaded", () => {
  // 폼 토글 및 삭제 (질문하신 핵심 기능)
  addBtn.addEventListener("click", () => formSection.hidden = !formSection.hidden);
  removeBtn.addEventListener("click", () => {
    if (lions.length > 1) { lions.pop(); renderAll(); }
    else alert("내 카드는 삭제할 수 없습니다.");
  });

  // 필터 및 검색
  filterPart.addEventListener("change", (e) => { currentFilter = e.target.value; renderAll(); });
  sortOption.addEventListener("change", (e) => { currentSort = e.target.value; renderAll(); });
  searchInput.addEventListener("input", (e) => { currentSearch = e.target.value; renderAll(); });

  // API 버튼들
  addOneRandomBtn.addEventListener("click", () => executeUserFetch("add", 1));
  addFiveRandomBtn.addEventListener("click", () => executeUserFetch("add", 5));
  refreshAllBtn.addEventListener("click", () => executeUserFetch("refresh", 3));
  
  // 폼 제출
  lionForm.addEventListener("submit", (e) => {
    e.preventDefault();
    lions.push({
      id: Date.now(),
      name: document.getElementById("nameInput").value,
      part: document.getElementById("partInput").value,
      interests: document.getElementById("interestInput").value.split(","),
      oneLine: document.getElementById("oneLineInput").value,
      intro: document.getElementById("introInput").value,
      contact: { email: document.getElementById("emailInput").value, phone: "", site: "" },
      message: document.getElementById("messageInput").value
    });
    renderAll();
    lionForm.reset();
    formSection.hidden = true;
  });

  cancelBtn.addEventListener("click", () => formSection.hidden = true);
  
  renderAll(); // 초기 렌더링
});