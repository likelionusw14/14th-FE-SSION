import { useState } from 'react';
import { Member, FormState, FormErrors, RandomApiResponse } from '../types';

const EMPTY_FORM: FormState = {
  name: '', part: '', skills: '', shortIntro: '',
  intro: '', phone: '', email: '', website: '', quote: '',
};

interface AddFormProps {
  isOpen: boolean;
  onSubmit: (member: Omit<Member, 'id'>) => void;
  onCancel: () => void;
}

function AddForm({ isOpen, onSubmit, onCancel }: AddFormProps) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    const key = id.replace('f-', '') as keyof FormState;
    setForm(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: '' }));
  };

  const handleFillRandom = async (): Promise<void> => {
    try {
      const res = await fetch('https://randomuser.me/api/?results=1');
      const data: RandomApiResponse = await res.json();
      const u = data.results[0];
      setForm({
        name: u.name.first + ' ' + u.name.last,
        part: 'Frontend',
        skills: 'HTML, CSS, JavaScript',
        shortIntro: u.login.username,
        intro: '안녕하세요, ' + u.name.first + '입니다!',
        phone: u.phone,
        email: u.email,
        website: '',
        quote: '',
      });
    } catch (e) {
      console.error('랜덤 값 불러오기 실패', e);
    }
  };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!form.name)       newErrors.name       = '이름을 입력해주세요.';
    if (!form.part)       newErrors.part       = '파트를 선택해주세요.';
    if (!form.skills)     newErrors.skills     = '관심 기술을 입력해주세요.';
    if (!form.shortIntro) newErrors.shortIntro = '한 줄 소개를 입력해주세요.';
    if (!form.intro)      newErrors.intro      = '자기소개를 입력해주세요.';
    if (!form.phone)      newErrors.phone      = '전화번호를 입력해주세요.';
    if (!form.email)      newErrors.email      = '이메일을 입력해주세요.';
    return newErrors;
  };

  const handleSubmit = (): void => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    const skillsArr = form.skills.split(',').map(s => s.trim()).filter(Boolean);
    onSubmit({ ...form, skills: skillsArr, imgSrc: '', isMine: false, org: '멋쟁이사자처럼' });
    setForm(EMPTY_FORM);
    setErrors({});
  };

  const handleCancel = (): void => {
    setForm(EMPTY_FORM);
    setErrors({});
    onCancel();
  };

  if (!isOpen) return null;

  return (
    <div id="add-form-wrap" className="open">
      <h2>🦁 새 아기사자 추가</h2>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="f-name">이름 *</label>
          <input id="f-name" type="text" placeholder="이름을 입력하세요"
            value={form.name} onChange={handleChange}
            className={errors.name ? 'invalid' : ''} />
          <span className="field-error">{errors.name}</span>
        </div>
        <div className="form-group">
          <label htmlFor="f-part">파트 *</label>
          <select id="f-part" value={form.part} onChange={handleChange}
            className={errors.part ? 'invalid' : ''}>
            <option value="">-- 선택하세요 --</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Design">Design</option>
          </select>
          <span className="field-error">{errors.part}</span>
        </div>
        <div className="form-group">
          <label htmlFor="f-skills">관심 기술 * (쉼표로 구분)</label>
          <input id="f-skills" type="text" placeholder="예: HTML, CSS, JavaScript"
            value={form.skills} onChange={handleChange}
            className={errors.skills ? 'invalid' : ''} />
          <span className="field-error">{errors.skills}</span>
        </div>
        <div className="form-group">
          <label htmlFor="f-short-intro">한 줄 소개 * (요약 카드용)</label>
          <input id="f-short-intro" type="text" placeholder="짧은 한 마디!"
            value={form.shortIntro}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setForm(prev => ({ ...prev, shortIntro: e.target.value }));
              setErrors(prev => ({ ...prev, shortIntro: '' }));
            }}
            className={errors.shortIntro ? 'invalid' : ''} />
          <span className="field-error">{errors.shortIntro}</span>
        </div>
        <div className="form-group full-width">
          <label htmlFor="f-intro">자기소개 * (상세 카드용)</label>
          <textarea id="f-intro" placeholder="자세한 자기소개를 입력하세요"
            value={form.intro} onChange={handleChange}
            className={errors.intro ? 'invalid' : ''} />
          <span className="field-error">{errors.intro}</span>
        </div>
        <div className="form-group">
          <label htmlFor="f-phone">전화번호 *</label>
          <input id="f-phone" type="text" placeholder="010-0000-0000"
            value={form.phone} onChange={handleChange}
            className={errors.phone ? 'invalid' : ''} />
          <span className="field-error">{errors.phone}</span>
        </div>
        <div className="form-group">
          <label htmlFor="f-email">이메일 *</label>
          <input id="f-email" type="email" placeholder="example@email.com"
            value={form.email} onChange={handleChange}
            className={errors.email ? 'invalid' : ''} />
          <span className="field-error">{errors.email}</span>
        </div>
        <div className="form-group">
          <label htmlFor="f-website">웹사이트</label>
          <input id="f-website" type="text" placeholder="https://..."
            value={form.website} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="f-quote">한 마디</label>
          <input id="f-quote" type="text" placeholder="나를 표현하는 한 마디!"
            value={form.quote} onChange={handleChange} />
        </div>
      </div>
      <div className="form-actions">
        <button className="btn btn-submit" onClick={handleSubmit}>추가하기</button>
        <button type="button" onClick={handleFillRandom}>🎲 랜덤 값 채우기</button>
        <button className="btn btn-cancel" onClick={handleCancel}>취소</button>
      </div>
    </div>
  );
}

export default AddForm;
