import styles from "./Header.module.css";

const Body = () => {
    return (
        <>
            <div className={styles.bgColor}>
                <div className={styles.controls}>
                    <button className={styles.button} id="addLion" onClick={() => 
                        {  if (container.innerHTML !== '') {
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
                        }}><b>아기 사자 추가</b></button>
                    <button className={styles.button} id="removeLastLion" onClick={() => {console.log("사자 삭제하기")}}><b>마지막 아기 사자 삭제</b></button>
                    <span id="totalCountDisplay">총<span id="totalCount" onClick={() => {console.log("count 변경")}}>9</span>명</span>
                </div>
            
                <div className={styles.apiControls}>
                    <button className={styles.button} id="addOneRandom">랜덤 1명 추가</button>
                    <button className={styles.button} id="addFiveRandom">랜덤 5명 추가</button>
                    <button className={styles.button} id="refreshAll">전체 새로고침</button>
                    <span id="apiStatus" className={styles.statusReady}>준비 완료</span>
                <button id="retryBtn" className={styles.button} className={styles.retryBtn} style={{ display: "none" }}>재시도</button>
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
    </>
    );
}

export default Body;