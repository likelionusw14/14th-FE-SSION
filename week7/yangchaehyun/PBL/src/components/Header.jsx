import styles from "./Lion.module.css";
import { useEffect } from "react";

let lionData = [];

const Body = ({ lionData: initialData }) => {
    useEffect(() => {
        lionData = initialData;
        setupEventListeners();
        render();
        }, []);

    return (
        <>
            <div className={styles.bgColor}>
                <div className={styles.controls}>
                    <button 
                        className={styles.button} 
                        id="addLion" 
                        onClick={toggleForm} >
                    <b> 아기 사자 추가</b></button>

                    <button className={styles.button} id="removeLastLion" onClick={removeLastLion}><b>마지막 아기 사자 삭제</b></button>
                    <span id="totalCountDisplay">총<span id="totalCount">0</span>명</span>
                </div>
            
                <div className={styles.apiControls}>
                    <button className={styles.button} id="addOneRandom">랜덤 1명 추가</button>
                    <button className={styles.button} id="addFiveRandom">랜덤 5명 추가</button>
                    <button className={styles.button} id="refreshAll">전체 새로고침</button>
                    <span id="apiStatus" className={styles.statusReady}>준비 완료</span>
                <button id="retryBtn" className={`${styles.button} ${styles.retryBtn}`} style={{ display: "none" }}>재시도</button>
            </div>
            <div className={styles.viewOptions}>
                <label>파트: 
                <select id="filterPart">
                    <option value="all">전체</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Design">Design</option>
                </select>
            </label>
            <label>정렬: 
                <select id="sortOrder">
                    <option value="latest">최신추가순</option>
                    <option value="name">이름순</option>
                </select>
            </label>
            <input type="text" id="searchInput" placeholder="이름으로 검색" />
            </div>
        </div>

        <div id="formContainer"></div>
            <main className={styles.grid} id="summaryGrid"></main>

            <div 
                id="emptyState" 
                style={{ 
                    display: "none", 
                    textAlign:"center", 
                    margin: "50px"
                }}>
                <h3>표시할 아기 사자가 없습니다. (필터/검색 조건을 확인해 주세요)</h3>
            </div>

            {/* <hr /> */}

            <section className={styles.DetailsGrid} id="detailsList" />
    </>
    );
}

// 재시도를 위해 마지막으로 요청했던 인원수를 저장하는 변수
let lastFetchCount = 0;


// 2. 이벤트 리스너 설정
function setupEventListeners() {
    // 필터/정렬/검색 값 변경 시 즉시 다시 그리기
    document.querySelector('#filterPart').onchange = render;
    document.querySelector('#sortOrder').onchange = render;
    document.querySelector('#searchInput').oninput = render;

    // // 아기 사자 조작 (추가/삭제)
    // document.querySelector('#addLion').onclick = toggleForm;
    // document.querySelector('#removeLastLion').onclick = removeLastLion;

    // 외부 API 연동
    document.querySelector('#addOneRandom').onclick = () => fetchLions(1, 'append');
    document.querySelector('#addFiveRandom').onclick = () => fetchLions(5, 'append');
    document.querySelector('#refreshAll').onclick = () => {
        // 현재 전체 인원수만큼 새로 받아와서 교체 (양채현 포함 싹 삭제)
        fetchLions(lionData.length, 'replace');
    };
    document.querySelector('#retryBtn').onclick = () => fetchLions(lastFetchCount, 'append');
}

// 3. 핵심 화면 갱신 함수 (Render)
function render() {
    const summaryGrid = document.querySelector('#summaryGrid');
    const detailsList = document.querySelector('#detailsList');
    const partFilter = document.querySelector('#filterPart').value;
    const sortOrder = document.querySelector('#sortOrder').value;
    const searchInput = document.querySelector('#searchInput').value.toLowerCase();

    // [Step 1] 필터링 & 검색
    let filtered = lionData.filter(lion => {
        const isPartMatch = (partFilter === 'all' || lion.track === partFilter);
        
        // 일반 이름 검색
        const isNameMatch = lion.name.toLowerCase().includes(searchInput);
        
        // 검색어 "ai" 입력 시 랜덤 추가된 데이터(특정 문구 포함) 검색 가능하도록 조건 추가
        const isAiSearch = (searchInput === 'ai' && 
            (lion.summary.includes("외부에서 온") || lion.description.includes("공부 중인 예비 개발자")));
            
        return isPartMatch && (isNameMatch || isAiSearch);
    });

    // [Step 2] 정렬
    if (sortOrder === 'name') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else {
        // 최신추가순 (ID 큰 순서)
        filtered.sort((a, b) => a.id - b.id);
    }

    // [Step 3] DOM 비우기
    // summaryGrid.innerHTML = '';
    // detailsList.innerHTML = '';

    // [Step 4] 조건에 맞는 데이터가 없을 때 처리
    const emptyState = document.querySelector('#emptyState');
    if (filtered.length === 0) {
        emptyState.style.display = 'block';
    } else {
        emptyState.style.display = 'none';
        // filtered.forEach(lion => {
        //     summaryGrid.appendChild(makeSummaryCard(lion));
        //     detailsList.appendChild(makeDetailsCard(lion));
        // });
    }

    // [Step 5] 총 인원 갱신
    document.querySelector('#totalCount').textContent = lionData.length;
}

// 4. API 비동기 통신 함수
async function fetchLions(count, mode) {
    lastFetchCount = count;
    updateStatus('loading');

    try {
        const response = await fetch(`https://randomuser.me/api/?results=${count}&nat=us,gb,ca,au,nz`);
        if (!response.ok) throw new Error('API 호출에 실패했습니다.');
        
        const json = await response.json();
        
        // 받아온 데이터를 우리 서비스 규격에 맞게 변환
        const mapped = json.results.map(u => ({
            id: Date.now() + Math.random(),
            name: `${u.name.first} ${u.name.last}`,
            track: ['Frontend', 'Backend', 'Design'][Math.floor(Math.random() * 3)],
            skills: ['React', 'Node.js', 'Figma', 'TypeScript'].slice(0, 2),
            summary: "외부에서 온 새내기 사자입니다!",
            description: `${u.location.city}에서 공부 중인 예비 개발자입니다. 잘 부탁드려요!`,
            email: u.email,
            phone: u.phone,
            website: `https://github.com/${u.login.username}`,
            oneLiner: "성장하는 사자가 되겠습니다!",
            img: u.picture.large
        }));

        if (mode === 'replace') {
            // [수정] 양채현 카드 포함 기존 모든 데이터를 지우고 새 데이터로만 교체
            lionData = mapped;
        } else {
            lionData = [...lionData, ...mapped];
        }

        updateStatus('success');
        render();
    } catch (err) {
        updateStatus('error', err.message);
    }
}

// 상태 문구 갱신
function updateStatus(state, msg = '') {
    const statusEl = document.querySelector('#apiStatus');
    const retryBtn = document.querySelector('#retryBtn');
    const apiBtns = document.querySelectorAll('.api-controls .button');

    if (state === 'loading') {
        statusEl.textContent = "불러오는 중...";
        statusEl.className = "status-loading";
        apiBtns.forEach(b => b.disabled = true);
        retryBtn.style.display = 'none';
    } else if (state === 'success') {
        statusEl.textContent = "준비 완료";
        statusEl.className = "status-ready";
        apiBtns.forEach(b => b.disabled = false);
    } else if (state === 'error') {
        statusEl.textContent = "실패: " + msg;
        statusEl.className = "status-error";
        apiBtns.forEach(b => b.disabled = false);
        retryBtn.style.display = 'inline-block';
    }
}

// 5. 폼 보조 및 기타 기능
function toggleForm() {
    const container = document.querySelector('#formContainer');
    if (container.innerHTML !== '') {
        container.innerHTML = '';
        return;
    }

    container.innerHTML = `
        <form id="addLionForm" class="styled-form">
            <h3 style="margin-bottom:10px;">🦁 아기 사자 등록</h3>
            <button type="button" class="button" id="fillRandom">랜덤 값 채우기</button>
            <div class="form-row">
                <input type="text" id="lionName" placeholder="이름" required>
                <select id="lionTrack">
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Design">Design</option>
                </select>
            </div>
            <input type="text" id="lionSkills" placeholder="기술 (쉼표로 구분)">
            <input type="text" id="lionSummary" placeholder="한 줄 소개">
            <textarea id="lionDescription" placeholder="자기소개"></textarea>
            <div class="form-row">
                <input type="email" id="lionEmail" placeholder="이메일">
                <input type="tel" id="lionPhone" placeholder="전화번호">
            </div>
            <input type="url" id="lionWebsite" placeholder="웹사이트">
            <input type="text" id="lionOneLiner" placeholder="한 마디">
            <div class="form-actions">
                <button type="submit" class="button">추가하기</button>
                <button type="button" class="button" onclick="document.querySelector('#formContainer').innerHTML=''">취소</button>
            </div>
        </form>
    `;

    document.querySelector('#fillRandom').onclick = async () => {
        const res = await fetch('https://randomuser.me/api/');
        const data = await res.json();
        const u = data.results[0];
        document.querySelector('#lionName').value = u.name.first;
        document.querySelector('#lionSkills').value = u.Skills;
        document.querySelector('#lionSummary').value = u.Summary;
        document.querySelector('#lionDescription').value = u.description;
        document.querySelector('#lionEmail').value = u.email;
        document.querySelector('#lionPhone').value = u.phone;
        document.querySelector('#lionWebsite').value = "https://github.com/" + u.login.username;
        document.querySelector('#lionOneLiner').value = u.OneLiner;
    };

    document.querySelector('#addLionForm').onsubmit = (e) => {
        e.preventDefault();
        const newLion = {
            id: Date.now(),
            name: document.querySelector('#lionName').value,
            track: document.querySelector('#lionTrack').value,
            skills: document.querySelector('#lionSkills').value.split(','),
            summary: document.querySelector('#lionSummary').value,
            description: document.querySelector('#lionDescription').value,
            email: document.querySelector('#lionEmail').value,
            phone: document.querySelector('#lionPhone').value,
            website: document.querySelector('#lionWebsite').value,
            oneLiner: document.querySelector('#lionOneLiner').value,
            img: "images/물음표.png"
        };
        lionData.push(newLion);
        container.innerHTML = '';
        render();
    };
}

function removeLastLion() {
    // 1. 현재 화면에 적용된 필터와 검색어 가져오기
    const partFilter = document.querySelector('#filterPart').value;
    const searchInput = document.querySelector('#searchInput').value.toLowerCase();
    const sortOrder = document.querySelector('#sortOrder').value; // 정렬 상태 추가
    
    // 2. render 함수와 동일한 로직으로 필터링
    let currentView = lionData.filter(lion => {
        const isPartMatch = (partFilter === 'all' || lion.track === partFilter);
        const isNameMatch = lion.name.toLowerCase().includes(searchInput);
        const isAiSearch = (searchInput === 'ai' && 
            (lion.summary.includes("외부에서 온") || lion.description.includes("공부 중인 예비 개발자")));
        return isPartMatch && (isNameMatch || isAiSearch);
    });

    // 3. [핵심] render 함수와 동일한 로직으로 정렬 수행
    // 이 과정을 거쳐야 "화면에 보이는 순서"와 "currentView의 순서"가 일치하게 됨
    if (sortOrder === 'name') {
        currentView.sort((a, b) => a.name.localeCompare(b.name));
    } else {
        currentView.sort((a, b) => a.id - b.id);
    }

    // 4. 화면에 보이는 것 중 가장 마지막 녀석의 ID를 찾아 제거
    if (currentView.length > 0) {
        const targetId = currentView[currentView.length - 1].id;
        lionData = lionData.filter(lion => lion.id !== targetId);
        render();
    } else {
        alert("삭제할 사자가 없습니다.");
    }
}

export default Body;