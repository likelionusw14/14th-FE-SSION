import { useRef } from 'react'

function AddForm({ isVisible, onAdd, onCancel }) {
  const formRef = useRef()

  function handleSubmit(e) {
    e.preventDefault()
    const q = (id) => formRef.current.querySelector(`#${id}`).value
    const newLion = {
      id: Date.now(),
      name: q('name'),
      part: q('part'),
      tech: q('tech'),
      simple: q('simpleIntro'),
      detail: q('detailIntro'),
      email: q('email'),
      phone: q('phone'),
      site: q('website'),
      word: q('word'),
      club: q('club'),
      isMe: false,
      img: 'https://via.placeholder.com/300x450?text=New',
    }
    onAdd(newLion)
    formRef.current.reset()
  }

  function handleCancel() {
    formRef.current.reset()
    onCancel()
  }

  async function handleRandomFill() {
    try {
      const res = await fetch('https://randomuser.me/api/')
      const { results } = await res.json()
      const u = results[0]
      const form = formRef.current
      form.querySelector('#name').value = `${u.name.first} ${u.name.last}`
      form.querySelector('#email').value = u.email
      form.querySelector('#phone').value = u.cell
      form.querySelector('#simpleIntro').value = '외부에서 온 아기 사자입니다.'
      form.querySelector('#detailIntro').value =
        `반갑습니다. 저는 ${u.location.city}에 사는 개발자입니다.`
      form.querySelector('#tech').value = 'JavaScript, HTML, CSS'
      form.querySelector('#word').value = '만나서 반가워요!'
    } catch {
      // 실패 시 무시
    }
  }

  return (
    <section id="form-section" className={isVisible ? '' : 'hidden'}>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="form-grid">
          <input type="text" id="name" placeholder="이름" required />
          <select id="part">
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Design">Design</option>
          </select>
          <input type="text" id="tech" placeholder="관심 기술 (쉼표로 구분)" required />
          <input type="text" id="simpleIntro" placeholder="한 줄 소개" required />
          <input type="email" id="email" placeholder="이메일" />
          <input type="text" id="phone" placeholder="전화번호" />
          <input type="url" id="website" placeholder="웹사이트 URL" />
          <input type="text" id="club" placeholder="동아리명" defaultValue="멋쟁이사자처럼" />
        </div>
        <textarea id="detailIntro" placeholder="상세 자기소개"></textarea>
        <input type="text" id="word" placeholder="한 마디" />
        <div className="form-actions">
          <button type="button" className="random-btn" onClick={handleRandomFill}>
            랜덤 값 채우기
          </button>
          <button type="submit" className="submit-btn">추가하기</button>
          <button type="button" className="cancel-btn" onClick={handleCancel}>취소</button>
        </div>
      </form>
    </section>
  )
}

export default AddForm
