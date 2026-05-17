import { useState, useEffect } from 'react'
import { fetchLions } from '../utils/fetchLions'

const EMPTY_FORM = {
  name: '',
  part: '',
  skill: '',
  intro: '',
  bio: '',
  email: '',
  phone: '',
  website: '',
  comment: '',
}

export default function AddForm({ onAdd, onClose }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [isLoadingRandom, setIsLoadingRandom] = useState(false)

  // ESC 키로 닫기
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setForm(EMPTY_FORM)
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = () => {
    // 모든 필드 체크 (website, comment는 선택)
    if (!form.name || !form.part || !form.skill || !form.intro || !form.bio || !form.email || !form.phone) {
      alert('모든 필수 항목을 입력해주세요!')
      return
    }
    onAdd({ ...form, profileImage: null })
    setForm(EMPTY_FORM)
    onClose()
  }

  const handleCancel = () => {
    setForm(EMPTY_FORM)
    onClose()
  }

  const handleRandomFill = async () => {
    setIsLoadingRandom(true)
    try {
      const [lion] = await fetchLions(1)
      setForm({
        name: lion.name,
        part: lion.part,
        skill: lion.skill,
        intro: lion.intro,
        bio: lion.bio,
        email: lion.email,
        phone: lion.phone,
        website: lion.website,
        comment: lion.comment,
      })
    } catch (e) {
      alert('랜덤 데이터를 불러오지 못했습니다.')
    } finally {
      setIsLoadingRandom(false)
    }
  }

  return (
    <div className="add-form-overlay" onClick={(e) => { if (e.target === e.currentTarget) handleCancel() }}>
      <div className="add-form">
        <div className="form-row">
          <div className="form-group">
            <label>이름</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="이름" />
          </div>
          <div className="form-group">
            <label>파트</label>
            <select name="part" value={form.part} onChange={handleChange}>
              <option value="">파트 선택</option>
              <option>Frontend</option>
              <option>Backend</option>
              <option>Design</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>관심 기술 (쉼표로 구분)</label>
          <input name="skill" value={form.skill} onChange={handleChange} placeholder="JavaScript, React, HTML/CSS" />
        </div>

        <div className="form-group">
          <label>한 줄 소개 (예제 카드)</label>
          <input name="intro" value={form.intro} onChange={handleChange} placeholder="Frontend · Canada Richmond에서 참류행이요!" />
        </div>

        <div className="form-group">
          <label>자기소개 (예제 카드)</label>
          <textarea name="bio" value={form.bio} onChange={handleChange} placeholder="자유롭게 자기소개를 작성해주세요." rows={4} />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Email</label>
            <input name="email" value={form.email} onChange={handleChange} placeholder="example@example.com" />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="010-0000-0000" />
          </div>
        </div>

        <div className="form-group">
          <label>Website</label>
          <input name="website" value={form.website} onChange={handleChange} placeholder="https://example.com" />
        </div>

        <div className="form-group">
          <label>한 마디</label>
          <input name="comment" value={form.comment} onChange={handleChange} placeholder="데이터가 바뀌면 UI도 바뀐다!" />
        </div>

        <div className="form-actions">
          <button className="btn btn-secondary" onClick={handleRandomFill} disabled={isLoadingRandom}>
            {isLoadingRandom ? '불러오는 중...' : '랜덤 값 채우기'}
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>추가하기</button>
          <button className="btn" onClick={handleCancel}>취소</button>
        </div>
      </div>
    </div>
  )
}
