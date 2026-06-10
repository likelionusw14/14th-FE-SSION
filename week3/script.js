let lions = [
    { name: "안혜선", part: "Frontend", tech: "React, HTML, CSS", simple: "성장 중입니다.", detail: "안녕하세요. 프론트엔드 개발자입니다.", email: "anhs_0218@naver.com", phone: "010-1234-5678", site: "https://instgram.com", word: "열심히 하겠습니다!", club: "멋쟁이사자처럼", isMe: true },
    { name: "김탄", part: "Backend", tech: "Spring, Java", simple: "서버 구조에 관심이 많습니다.", detail: "안정적인 서비스를 만듭니다.", email: "tan@naver.com", phone: "010-1111-2222", site: "#", word: "반갑습니다.", club: "멋쟁이사자처럼", isMe: false },
    { name: "차은상", part: "Design", tech: "Figma, Adobe", simple: "사용자 중심 디자인.", detail: "디자인 공부 중입니다.", email: "eunsang@naver.com", phone: "010-3333-4444", site: "#", word: "잘 부탁드려요.", club: "멋쟁이사자처럼", isMe: false },
    { name: "최영도", part: "Frontend", tech: "TypeScript", simple: "컴포넌트 설계에 흥미가 있습니다.", detail: "프론트엔드 열공 중.", email: "youngdo@naver.com", phone: "010-5555-6666", site: "#", word: "화이팅!", club: "멋쟁이사자처럼", isMe: false },
    { name: "유라헬", part: "Backend", tech: "Node.js", simple: "데이터 효율성 중시.", detail: "백엔드 개발자 유라헬입니다.", email: "rachel@naver.com", phone: "010-7777-8888", site: "#", word: "감사합니다.", club: "멋쟁이사자처럼", isMe: false },
    { name: "이효신", part: "Design", tech: "Design System", simple: "일관성 있는 시스템.", detail: "시스템 디자인 전문가 지망.", email: "hyoshin@naver.com", phone: "010-9999-0000", site: "#", word: "열심히!", club: "멋쟁이사자처럼", isMe: false },
    { name: "이보나", part: "Frontend", tech: "CSS Grid", simple: "레이아웃 구현을 좋아합니다.", detail: "화면 구성을 즐깁니다.", email: "bona@naver.com", phone: "010-1212-3434", site: "#", word: "예쁘게 만들게요.", club: "멋쟁이사자처럼", isMe: false },
    { name: "윤찬영", part: "Backend", tech: "GraphQL", simple: "유연한 API 설계.", detail: "API 설계가 즐겁습니다.", email: "cy@naver.com", phone: "010-5656-7878", site: "#", word: "반가워요.", club: "멋쟁이사자처럼", isMe: false },
    { name: "조명수", part: "Design", tech: "Typography", simple: "글꼴과 배치의 조화.", detail: "타이포그래피 연구 중.", email: "ms@naver.com", phone: "010-9090-1212", site: "#", word: "하이!", club: "멋쟁이사자처럼", isMe: false }
];

const summaryContainer = document.getElementById('summary-container');
const detailContainer = document.getElementById('detail-container');
const totalCountElement = document.getElementById('total-count');
const formSection = document.getElementById('form-section');
const lionForm = document.getElementById('lion-form');

function render() {
    summaryContainer.innerHTML = '';
    detailContainer.innerHTML = '';
    totalCountElement.textContent = `총 ${lions.length}명`;

    lions.forEach((lion, index) => {
        // 배지: 쉼표 기준 첫 번째 기술 추출
        const firstTech = lion.tech.split(',')[0].trim();

        // 요약 카드
        const summaryHTML = `
            <article class="card ${lion.isMe ? 'my-card' : ''}">
                <div class="img-box">
                    <img src="image/${index + 1}.png" alt="${lion.name}" onerror="this.src='https://via.placeholder.com/300x450?text=Lion'">
                    <span class="badge">${firstTech}</span>
                </div>
                <div class="card-content">
                    <h4>${lion.name}</h4>
                    <p class="role">${lion.part}</p>
                    <p class="description">${lion.simple}</p>
                </div>
            </article>
        `;
        summaryContainer.insertAdjacentHTML('beforeend', summaryHTML);

        // 상세 정보 (불렛포인트 리스트)
        const techList = lion.tech.split(',').map(t => `<li>${t.trim()}</li>`).join('');
        const detailHTML = `
            <article class="info-item">
                <h2>${lion.name}</h2>
                <p class="role">${lion.part} | ${lion.club}</p>
                <div class="info-group">
                    <h3 style="margin-top:15px">관심 기술</h3>
                    <ul>${techList}</ul>
                    <h3 style="margin-top:15px">자기소개</h3>
                    <p>${lion.detail}</p>
                    <h3 style="margin-top:15px">한 마디</h3>
                    <p>"${lion.word}"</p>
                </div>
            </article>
        `;
        detailContainer.insertAdjacentHTML('beforeend', detailHTML);
    });
}

// 이벤트 리스너들
document.getElementById('toggle-form-btn').addEventListener('click', () => formSection.classList.toggle('hidden'));
document.getElementById('cancel-btn').addEventListener('click', () => {
    formSection.classList.add('hidden');
    lionForm.reset();
});

document.getElementById('delete-last-btn').addEventListener('click', () => {
    if (lions.length > 0) {
        lions.pop();
        render();
    }
});

lionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newLion = {
        name: document.getElementById('name').value,
        part: document.getElementById('part').value,
        tech: document.getElementById('tech').value,
        simple: document.getElementById('simpleIntro').value,
        detail: document.getElementById('detailIntro').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        site: document.getElementById('website').value,
        club: document.getElementById('club').value,
        word: document.getElementById('word').value,
        isMe: false
    };
    lions.push(newLion);
    render();
    lionForm.reset();
    formSection.classList.add('hidden');
});

render();