import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <>
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

            <hr />

            <section className={styles.DetailsGrid} id="detailsList" />
        </>
    );
}
export default Footer