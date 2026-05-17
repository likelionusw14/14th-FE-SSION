import styles from "./Lion.module.css";

function Lion({id, name, track, skills, summary, description, email, phone, website, oneLiner, img}) {
    return (
        <div className={`${styles.DetailsCardBody} ${styles.DetailsCard}`}>
        <h1>{name}</h1>
        <p>{track}</p>

        <pre className="gray">LION TRACK</pre>

        <h3>자기소개</h3>
        <b>{description}</b>

        <h3>연락처</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
        <li>Email : {email}</li>
        <li>Phone : {phone}</li>
        <li>
            Website :{" "}
            <a href={website} target="_blank" rel="noreferrer">
            {website}
        </a>
        </li>
        </ul>

        <h3>관심 기술</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
        {skills.map((s, i) => (
            <li key={i}>{s.trim()}</li>
        ))}
        </ul>

        <h3>한 마디</h3>
        <b>
        <mark>{oneLiner}</mark>
        </b>
    </div>
    );
}
export default Lion