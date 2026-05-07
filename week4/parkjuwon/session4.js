// 아기 사자 추가 버튼 클릭 시 입력 카드 보여주기
document.getElementById("add").onclick = function() {
    document.querySelector(".addcard").style.display = "block";
};

// 카드 개수 업데이트 함수
function updateCardCount() {
    const countEl = document.getElementById('count');
    const cards = document.querySelectorAll('.cardlist .card');
    countEl.innerText = `${cards.length}명`;
}

// 페이지 로드 후 초기 개수 업데이트
window.addEventListener('DOMContentLoaded', () => {
    updateCardCount();
});

// 카드 생성 버튼 클릭
document.getElementById("creatCard").onclick = function() {
    const name = document.getElementById("name").value.trim();
    const part = document.getElementById("part").value.trim();
    const interesting = document.getElementById("interesting").value.trim();
    const summary = document.getElementById("summary").value.trim();
    const introduction = document.getElementById("introduction").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const website = document.getElementById("website").value.trim();
    const lastWords = document.getElementById("last-words").value.trim();


    // 필수 입력 체크
    if (!name) {
        alert("이름을 입력하세요!");
        return;
    }
    if (!part) {
        alert("파트를 선택하세요!");
        return;
    }
    if (!interesting) {
        alert("관심 기술을 입력하세요!");
        return;
    }
    if (!summary) {
        alert("한 줄 소개를 입력하세요!");
        return;
    }  
    if (!introduction) {
        alert("자기소개를 입력하세요!");
        return;
    }
    if (!email) {
        alert("Email을 입력하세요!");
        return;
    }
    if (!phone) {
        alert("Phone을 입력하세요!");
        return;
    }
    if (!website) {
        alert("Website을 입력하세요!");
        return;
    }
    if (!lastWords) {
        alert("한 마디를 입력하세요!");
        return;
    }


    // 카드 생성
    const card = document.createElement("div");
    card.className = "card";

    const h2 = document.createElement("h2");
    h2.textContent = name;

    const role = document.createElement("p");
    role.textContent = part;

    const summaryP = document.createElement("p");
    summaryP.textContent = summary;

    card.appendChild(h2);
    card.appendChild(role);
    card.appendChild(summaryP);

    document.querySelector(".cardlist").appendChild(card);
    
    //상세카드 추가
    const introduce = document.createElement("div");
    introduce.className = "introduce";

    // 이름
    const title = document.createElement("h1");
    title.textContent = name;

    // 파트
    const roleText = document.createElement("p");
    roleText.className = "role";
    roleText.textContent = part;

    // 트랙
    const track = document.createElement("p");
    track.textContent = "LION TRACK";

    // 자기소개 제목
    const introTitle = document.createElement("h3");
    introTitle.textContent = "자기소개";

    // 자기소개 내용
    const introContent = document.createElement("p");
    introContent.textContent = introduction;

    // 연락처 제목
    const contactTitle = document.createElement("h3");
    contactTitle.textContent = "연락처";

    // 연락처 리스트
    const contactList = document.createElement("ul");

    const emailLi = document.createElement("li");
    emailLi.textContent = "Email: " + email;

    const phoneLi = document.createElement("li");
    phoneLi.textContent = "Phone: " + phone;

    contactList.appendChild(emailLi);
    contactList.appendChild(phoneLi);

    // 관심 기술 제목
    const techTitle = document.createElement("h3");
    techTitle.textContent = "관심 기술";

    // 관심 기술 리스트
    const techList = document.createElement("ul");

    const techArray = interesting.split(",");

    techArray.forEach(tech => {
    const li = document.createElement("li");
    li.textContent = tech.trim();
    techList.appendChild(li);
    });

    // 한 마디 제목
    const lastTitle = document.createElement("h3");
    lastTitle.textContent = "한 마디";

    // 한 마디 내용
    const lastContent = document.createElement("p");
    lastContent.textContent = lastWords;

    // 🔥 전부 붙이기
    introduce.appendChild(title);
    introduce.appendChild(roleText);
    introduce.appendChild(track);

    introduce.appendChild(introTitle);
    introduce.appendChild(introContent);

    introduce.appendChild(contactTitle);
    introduce.appendChild(contactList);

    introduce.appendChild(techTitle);
    introduce.appendChild(techList);

    introduce.appendChild(lastTitle);
    introduce.appendChild(lastContent);

    // 화면에 추가
    document.body.appendChild(introduce);

    // 카드 개수 업데이트
    updateCardCount();

    // 입력창 초기화
    document.getElementById("name").value = "";
    document.getElementById("part").value = "";
    document.getElementById("interesting").value = "";
    document.getElementById("summary").value = "";
    document.getElementById("introduction").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("website").value = "";
    document.getElementById("last-words").value = "";
    document.querySelector(".addcard").style.display = "none";
};

// 마지막 카드 삭제 버튼 클릭
document.getElementById("del").onclick = function() {
    const cardList = document.querySelector(".cardlist");
    const cards = cardList.querySelectorAll('.card');
    if (cards.length > 0) {
        cardList.removeChild(cards[cards.length - 1]);
        updateCardCount();
    }
};

const searchInput = document.getElementById("search");
const filterSelect = document.getElementById("filter");

function applyFilter() {
  const keyword = searchInput.value.toLowerCase();
  const selected = filterSelect.value.toLowerCase();

  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    const name = card.querySelector("h2").innerText.toLowerCase();

    // 🔥 역할 가져오기 (myrole + role 둘 다 대응)
    let roleText = "";

    if (card.querySelector(".myrole")) {
      roleText = card.querySelector(".myrole").innerText;
    } else if (card.querySelector(".role")) {
      roleText = card.querySelector(".role").innerText;
    }

    roleText = roleText.toLowerCase();

    // 🔥 핵심: 둘 다 만족해야 보임
    const matchName = name.includes(keyword);
    const matchRole = selected === "all" || roleText.includes(selected);

    if (matchName && matchRole) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// 🔥 이벤트 연결 (중요)
searchInput.oninput = applyFilter;
filterSelect.onchange = applyFilter;

// 랜덤 유저 1명
document.getElementById("random1").onclick = async function () {
  const res = await fetch("https://randomuser.me/api/?results=1&nat=us,gb,ca,au,nz");
  const data = await res.json();

  const user = data.results[0];

  const card = document.createElement("div");
  card.className = "card";

  const img = document.createElement("img");
  img.src = user.picture.medium;

  const h2 = document.createElement("h2");
  h2.textContent = `${user.name.first} ${user.name.last}`;

  const role = document.createElement("p");
  role.textContent = "Frontend"; // 랜덤 API에는 역할 없음 → 임시값

  const desc = document.createElement("p");
  desc.textContent = user.email;

  card.appendChild(img);
  card.appendChild(h2);
  card.appendChild(role);
  card.appendChild(desc);

  document.querySelector(".cardlist").appendChild(card);

  updateCardCount();
};

// 랜덤 유저 5명
document.getElementById("random5").onclick = async function () {
  const res = await fetch("https://randomuser.me/api/?results=5&nat=us,gb,ca,au,nz");
  const data = await res.json();

  data.results.forEach(user => {
    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = user.picture.medium;

    const h2 = document.createElement("h2");
    h2.textContent = `${user.name.first} ${user.name.last}`;

    const role = document.createElement("p");
    role.textContent = "Frontend";

    const desc = document.createElement("p");
    desc.textContent = user.email;

    card.appendChild(img);
    card.appendChild(h2);
    card.appendChild(role);
    card.appendChild(desc);

    document.querySelector(".cardlist").appendChild(card);
  });

  updateCardCount();
};
// 새로고침 버튼
const status = document.getElementById("status");

document.getElementById("refresh").onclick = async function () {

  const cardList = document.querySelector(".cardlist");

  // 1. 현재 카드 개수 저장
  const currentCount = cardList.querySelectorAll(".card").length;

  // 2. 상태 변경
  status.textContent = "불러오는 중...";

  try {
    // 3. 기존 카드 삭제
    cardList.querySelectorAll(".card").forEach(card => card.remove());

    // 4. 새 데이터 요청
    const res = await fetch(
      `https://randomuser.me/api/?results=${currentCount}&nat=us,gb,ca,au,nz`
    );

    if (!res.ok) throw new Error("네트워크 오류");

    const data = await res.json();

    // 5. 카드 다시 생성
    data.results.forEach(user => {
      const card = document.createElement("div");
      card.className = "card";

      const img = document.createElement("img");
      img.src = user.picture.medium;

      const h2 = document.createElement("h2");
      h2.textContent = `${user.name.first} ${user.name.last}`;

      const role = document.createElement("p");
      role.textContent = "Frontend";

      const desc = document.createElement("p");
      desc.textContent = user.email;

      card.appendChild(img);
      card.appendChild(h2);
      card.appendChild(role);
      card.appendChild(desc);

      cardList.appendChild(card);
    });

    // 6. 상태 완료
    status.textContent = "완료!";
    setTimeout(() => status.textContent = "준비 완료", 1000);

  } catch (err) {
    status.textContent = "불러오기 실패";
  }

  // 7. 개수 업데이트
  updateCardCount();
};
