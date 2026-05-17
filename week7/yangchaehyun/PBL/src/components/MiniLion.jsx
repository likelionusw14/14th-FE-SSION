import styles from "./Lion.module.css";

function MiniLion({id, name, track, summary, img, skills}) {
    const isMe = name === "양채현";
    return (
        <div className={`${isMe ? "my-card" : "card"} ${styles.boxMoving}`}  style={{ position: "relative" }}>    
            <img
                src={img || "../assets/물음표.png"}
                alt={name}
            />

            <div className={styles.text}>
                {skills?.[0] || "Skill"}
            </div>

            <div className={styles.cardBody}>
                <h2>{name}</h2>
                <p>{track}</p>
                <b>{summary}</b>
            </div>
        </div>
    );
}
export default MiniLion