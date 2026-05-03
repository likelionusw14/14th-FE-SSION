import Husigidane from './assets/0001.webp'

export const fetchRandomLions = async (count) => {
    try{
        const res = await fetch(`https://randomuser.me/api/?results=${count}&nat=us,gb`);

        if (!res.ok) throw new Error("API 요청 실패");

        const data = await res.json();



        //받아온 데이터 우리 서비스 데이터로 이동

        return data.results.map((u) => ({
            id: Date.now() + Math.random(),
            
            isMe: false,
            image: Husigidane,
            name: `${u.name.first} ${u.name.last}`,
            part: ["Frontend", "Backend", "Design"][Math.floor(Math.random()*3)],
            interests: ["JS", "React", "Design"],
            oneLine: "API로 추가된 사자입니다!",
            contact: { 
                email: u.email, 
                phone: u.cell 
                },
                message: "화이팅! 반가워요."
        }));
        
    }catch(error){
        console.error("사자 데이터 불러오기 실패:", error);
        throw error; //에러를 상위(App.jsx)로 던져서 상태 처리를 하게 합니다.
    }
};