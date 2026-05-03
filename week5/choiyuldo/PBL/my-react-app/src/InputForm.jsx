import react from "react";
import './InputForm.css';

function InputForm({lions,setLions,setShowForm}){
    const handleSubmit = (e) => {
        e.preventDefault();


        //새로운 사자 데이터 생성
        const newLion ={
            id: Date.now(),
            name: e.target.name.value,
            part: e.target.part.value,
        interests: e.target.interests.value.split(",").map(i => i.trim()),
        oneLine: e.target.oneLine.value,
        contact: { email: e.target.email.value },
        message: e.target.message.value,
        isMe: false
        };


        setLions([...lions,newLion]);
        setShowForm(false);
        e.target.reset();

    };
    return(
        <section className="InputForm">
            <form onSubmit = {handleSubmit}>
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

            <div className = "form-buttons">
                <button type = "submit">추가</button>
                <button type = "button" onClick={() => setShowForm(false)}>취소</button>
            </div>
            </form>
        </section>
    );


}

export default InputForm;