// src/Api.ts
import Husigidane from './assets/0001.webp';
import type { Lion } from './types';

export const fetchRandomLions = async (count: number): Promise<Lion[]> => {
    try {
        const res = await fetch(`https://randomuser.me/api/?results=${count}&nat=us,gb`);
        if (!res.ok) throw new Error("API 요청 실패");
        const data = await res.json();

        return data.results.map((u: any): Lion => ({
            id: Date.now() + Math.random(),
            isMe: false,
            image: Husigidane,
            name: `${u.name.first} ${u.name.last}`,
            part: ["Frontend", "Backend", "Design"][Math.floor(Math.random() * 3)],
            interests: ["JS", "React", "Design"],
            oneLine: "API로 추가된 사자입니다!",
            contact: { email: u.email, phone: u.cell },
            message: "화이팅! 반가워요."
        }));
    } catch (error) {
        console.error("데이터 실패:", error);
        throw error;
    }
};