import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/week4.css";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

export const initialLions = [
  {
    id: 1,
    name: "신진호",
    part: "Frontend",
    oneLine: "기획과 사용자 경험을 연결해, 아이디어를 실제 서비스로 만드는 사람입니다.",
    description: "기획과 사용자 경험을 연결해, 아이디어를 실제 서비스로 구현하는 것을 목표로 합니다.",
    skills: ["HTML", "CSS", "JavaScript"],
    email: "example@email.com",
    phone: "010-0000-0000",
    website: "https://example.com",
    comment: "반갑습니다!",
    image: "/profile.jpg",
    isMine: true,
    createdAt: Date.now(),
  },
  {
    id: 2,
    name: "김형진",
    part: "Frontend",
    oneLine: "프론트엔드가 좋아요.",
    description: "프론트엔드 개발을 즐기며, 사용자에게 좋은 화면을 제공하는 것을 좋아합니다.",
    skills: ["HTML", "CSS"],
    email: "example@email.com",
    phone: "010-0000-0000",
    website: "https://example.com",
    comment: "잘 부탁드립니다!",
    image: "/gim.jpg",
    isMine: false,
    createdAt: Date.now() - 1,
  },
  {
    id: 3,
    name: "우영우",
    part: "Backend",
    oneLine: "토마토 기러기 스윙스",
    description: "독특한 사고방식으로 세상을 바라보며 문제를 해결합니다.",
    skills: ["Node.js", "API", "DB"],
    email: "example@email.com",
    phone: "010-0000-0000",
    website: "https://example.com",
    comment: "반갑습니다!",
    image: "/yy.jpg",
    isMine: false,
    createdAt: Date.now() - 2,
  },
];
export function makeLionFromApi(user) {
  const parts = ["Frontend", "Backend", "Design"];
  const randomPart = parts[Math.floor(Math.random() * parts.length)];

  return {
    id: crypto.randomUUID(),
    name: `${user.name.first} ${user.name.last}`,
    part: randomPart,
    oneLine: `${randomPart}에 관심이 많은 아기 사자입니다.`,
    description: `${user.name.first} ${user.name.last}는 새로운 기술을 배우고 협업하는 것을 좋아합니다.`,
    skills:
      randomPart === "Frontend"
        ? ["HTML", "CSS", "JavaScript"]
        : randomPart === "Backend"
        ? ["Node.js", "API", "DB"]
        : ["Figma", "UI", "UX"],
    email: user.email,
    phone: user.phone,
    website: user.picture.large,
    comment: "잘 부탁드립니다!",
    image: user.picture.large,
    isMine: false,
    createdAt: Date.now(),
  };
}

export async function fetchRandomLions(count) {
  const response = await fetch(
    `https://randomuser.me/api/?results=${count}&nat=us,gb,ca,au,nz`
  );

  if (!response.ok) {
    throw new Error("네트워크 요청 실패");
  }

  const data = await response.json();
  return data.results.map(makeLionFromApi);
}import { useMemo, useState, useEffect } from "react";
import { initialLions } from "./data/lions";
import { fetchRandomLions } from "./utils/randomUser";

export default function App() {
  const [lions, setLions] = useState(initialLions);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [filterPart, setFilterPart] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const [searchName, setSearchName] = useState("");

  const [status, setStatus] = useState("준비 완료");
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [lastAction, setLastAction] = useState(null);

  const emptyForm = {
    name: "",
    part: "",
    skills: "",
    oneLine: "",
    description: "",
    email: "",
    phone: "",
    website: "",
    comment: "",
    image: "",
  };

  const [form, setForm] = useState(emptyForm);

  const viewLions = useMemo(() => {
    let result = [...lions];

    if (filterPart !== "all") {
      result = result.filter((lion) => lion.part === filterPart);
    }

    if (searchName.trim()) {
      result = result.filter((lion) =>
        lion.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name, "ko"));
    } else {
      result.sort((a, b) => b.createdAt - a.createdAt);
    }

    return result;
  }, [lions, filterPart, sortBy, searchName]);

  function closeForm() {
    setForm(emptyForm);
    setIsFormOpen(false);
  }

  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") {
        closeForm();
      }
    }

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  async function runRequest(action) {
    try {
      setIsLoading(true);
      setHasError(false);
      setStatus("불러오는 중...");

      await action();

      setStatus("완료!");
      setTimeout(() => setStatus("준비 완료"), 1200);
    } catch (error) {
      setHasError(true);
      setStatus(`불러오기 실패: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  function handleAddRandom(count) {
    const action = async () => {
      const newLions = await fetchRandomLions(count);
      setLions((prev) => [...prev, ...newLions]);
    };

    setLastAction(() => action);
    runRequest(action);
  }

  function handleRefreshAll() {
    const action = async () => {
      const myCards = lions.filter((lion) => lion.isMine);
      const replaceCount = lions.length - myCards.length;
      const newLions = await fetchRandomLions(replaceCount);

      setLions([...myCards, ...newLions]);
    };

    setLastAction(() => action);
    runRequest(action);
  }

  function handleDeleteLast() {
    setLions((prev) => prev.slice(0, -1));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function isFormValid() {
    return Object.values(form).every((value) => value.trim() !== "");
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!isFormValid()) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    const newLion = {
      id: crypto.randomUUID(),
      name: form.name,
      part: form.part,
      skills: form.skills.split(",").map((skill) => skill.trim()),
      oneLine: form.oneLine,
      description: form.description,
      email: form.email,
      phone: form.phone,
      website: form.website,
      comment: form.comment,
      image: form.image,
      isMine: false,
      createdAt: Date.now(),
    };

    setLions((prev) => [...prev, newLion]);
    closeForm();
  }

  function handleFillRandom() {
    const action = async () => {
      const [randomLion] = await fetchRandomLions(1);

      setForm({
        name: randomLion.name,
        part: randomLion.part,
        skills: randomLion.skills.join(", "),
        oneLine: randomLion.oneLine,
        description: randomLion.description,
        email: randomLion.email,
        phone: randomLion.phone,
        website: randomLion.website,
        comment: randomLion.comment,
        image: randomLion.image,
      });

      setIsFormOpen(true);
    };

    setLastAction(() => action);
    runRequest(action);
  }

  return (
    <>
      <div id="app">
        <section className="control-panel">
          <div className="control-row">
            <button onClick={() => setIsFormOpen(!isFormOpen)}>
              아기 사자 추가
            </button>
            <button onClick={handleDeleteLast}>마지막 아기 사자 삭제</button>
            <p id="memberCount" style={{ margin: 0, fontWeight: "bold" }}>
              총 {lions.length}명
            </p>
          </div>

          <div className="control-row">
            <button disabled={isLoading} onClick={() => handleAddRandom(1)}>
              랜덤 1명 추가
            </button>
            <button disabled={isLoading} onClick={() => handleAddRandom(5)}>
              랜덤 5명 추가
            </button>
            <button disabled={isLoading} onClick={handleRefreshAll}>
              전체 새로고침
            </button>
          </div>

          <div className="status-box">
            <strong>상태:</strong> <span>{status}</span>

            {hasError && (
              <div className="retry-wrap">
                <button disabled={isLoading} onClick={() => lastAction?.()}>
                  재시도
                </button>
              </div>
            )}
          </div>

          <div className="control-row" style={{ marginTop: "14px" }}>
            <select value={filterPart} onChange={(e) => setFilterPart(e.target.value)}>
              <option value="all">전체</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Design">Design</option>
            </select>

            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="latest">최신추가순</option>
              <option value="name">이름순</option>
            </select>

            <input
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="이름으로 검색"
            />
          </div>

          {isFormOpen && (
            <form id="lionForm" style={{ display: "block" }} onSubmit={handleSubmit}>
              <div className="form-grid">
                <input name="name" placeholder="이름" value={form.name} onChange={handleChange} />

                <select name="part" value={form.part} onChange={handleChange}>
                  <option value="">파트 선택</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Design">Design</option>
                </select>

                <input className="full" name="skills" placeholder="관심 기술" value={form.skills} onChange={handleChange} />
                <input className="full" name="oneLine" placeholder="한 줄 소개" value={form.oneLine} onChange={handleChange} />
                <textarea className="full" name="description" placeholder="자기소개" value={form.description} onChange={handleChange} />
                <input name="email" placeholder="이메일" value={form.email} onChange={handleChange} />
                <input name="phone" placeholder="전화번호" value={form.phone} onChange={handleChange} />
                <input className="full" name="website" placeholder="웹사이트" value={form.website} onChange={handleChange} />
                <input className="full" name="comment" placeholder="한 마디" value={form.comment} onChange={handleChange} />
                <input className="full" name="image" placeholder="이미지 경로" value={form.image} onChange={handleChange} />
              </div>

              <div className="control-row" style={{ marginTop: "14px" }}>
                <button type="button" disabled={isLoading} onClick={handleFillRandom}>
                  랜덤 값 채우기
                </button>
                <button type="submit">추가하기</button>
                <button type="button" onClick={closeForm}>
                  취소
                </button>
              </div>
            </form>
          )}
        </section>
      </div>

      <main className="page">
        {viewLions.length === 0 ? (
          <div className="empty-message">
            표시할 아기 사자가 없습니다. 필터/검색 조건을 확인해 주세요.
          </div>
        ) : (
          viewLions.map((lion) => (
            <section key={lion.id} className={lion.isMine ? "card1" : "card"}>
              <img className="profile-image" src={lion.image} alt={`${lion.name} 프로필`} />
              <h1 className="name">{lion.name}</h1>
              <div className="part">{lion.part}</div>
              <p className="one-line">{lion.oneLine}</p>
            </section>
          ))
        )}
      </main>

      <section className="detail-list">
        {viewLions.map((lion) => (
          <article key={lion.id} className="detail-card">
            <h2 className="detail-name">{lion.name}</h2>
            <p className="detail-role">{lion.part}</p>
            <p className="detail-desc">{lion.description}</p>
            <p><strong>관심 기술:</strong> {lion.skills.join(", ")}</p>
            <p><strong>이메일:</strong> {lion.email}</p>
            <p><strong>전화번호:</strong> {lion.phone}</p>
            <p><strong>웹사이트:</strong> {lion.website}</p>
            <p><strong>한 마디:</strong> {lion.comment}</p>
          </article>
        ))}
      </section>
    </>
  );
}