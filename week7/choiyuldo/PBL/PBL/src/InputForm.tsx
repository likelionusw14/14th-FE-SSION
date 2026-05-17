
import React from "react";
import './InputForm.css';
import type { Lion } from './types';

interface InputFormProps {
    lions: Lion[];
    setLions: React.Dispatch<React.SetStateAction<Lion[]>>;
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

function InputForm({ lions, setLions, setShowForm }: InputFormProps) {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.currentTarget;

        const newLion: Lion = {
            id: Date.now(),
            name: (target.elements.namedItem('name') as HTMLInputElement).value,
            part: (target.elements.namedItem('part') as HTMLSelectElement).value,
            interests: (target.elements.namedItem('interests') as HTMLInputElement).value.split(",").map(i => i.trim()),
            oneLine: (target.elements.namedItem('oneLine') as HTMLInputElement).value,
            contact: { email: (target.elements.namedItem('email') as HTMLInputElement).value },
            message: (target.elements.namedItem('message') as HTMLTextAreaElement).value,
            isMe: false,
            image: ""
        };

        setLions([...lions, newLion]);
        setShowForm(false);
        target.reset();
    };

    return (
        <section className="InputForm">
            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="이름" required />
                <select name="part">
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Design">Design</option>
                </select>
                <input name="interests" placeholder="관심사 (쉼표 구분)" />
                <input name="oneLine" placeholder="한 줄 소개" />
                <input name="email" placeholder="이메일" />
                <textarea name="message" placeholder="응원 메시지" />

                <div className="form-buttons">
                    <button type="submit">추가</button>
                    <button type="button" onClick={() => setShowForm(false)}>취소</button>
                </div>
            </form>
        </section>
    );
}

export default InputForm;