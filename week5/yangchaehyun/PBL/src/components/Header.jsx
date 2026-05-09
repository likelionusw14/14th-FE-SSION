import styles from "./Header.module.css";

const Body = () => {
    return (
        <>
            <div className={styles.bgColor}>
                <div className={styles.controls}>
                    <button className={styles.button} id="addLion" onClick={() => {console.log("저는 말하는 감자입니다..")}}><b>아기 사자 추가</b></button>
                    <button className={styles.button} id="removeLastLion" onClick={() => {console.log("사자 삭제하기")}}><b>마지막 아기 사자 삭제</b></button>
                    <span id="totalCountDisplay">총<span id="totalCount" onClick={() => {console.log("count 변경")}}>0</span>명</span>
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