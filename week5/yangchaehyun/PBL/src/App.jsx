//....이건 또 어떻게 하는 걸까요 ㅜㅜ
import React, { useState, useEffect } from "react";

import Body from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [lion, setLions] = useState([
    {
        id: 1,
        name: "양채현",
        track: "Frontend",
        skills: ["HTML/CSS", "JavaScript", "React"],
        summary: "초보 프론트엔드 개발자",
        description: "아직 부족한 점이 많지만, 그만큼 더 열정적으로 배우고 성장하고 싶습니다! 이번 멋사 14기 활동을 통해 유익한 지식도 쑥쑥 키우고, 좋은 분들과 소중한 인연을 듬뿍 만들어가고 싶어요.",
        email: "2423978@naver.com",
        phone: "010-4827-9391",
        website: "https://github.com/anwjrdid",
        oneLiner: "열심히 배워서 멋쟁이 사자로 성장하겠습니다!",
        img: "images/메타몽.png"
    },
    {
        id: 2,
        name: "메타몽 피카츄",
        track: "Frontend",
        skills: ["전기쇼크", "전광석화", "볼트태클"],
        summary: "메타몽이 피카츄로 변신한 모습이다.",
        description: "노란 털과 붉은 전기 주머니, 번개 모양 꼬리가 특징인 '쥐 포켓몬'",
        email: "2423978@naver.com",
        phone: "010-4827-9391",
        website: "https://github.com/anwjrdid",
        oneLiner: "피카피카",
        img: "images/메타몽_피카츄.png"
    },
    {
        id: 3,
        name: "메타몽 꼬부기",
        track: "Frontend",
        skills: ["물대포", "로켓박치기", "하이드로펌프"],
        summary: "메타몽이 꼬부기로 변신한 모습이다.",
        description: "단단한 등껍질에 몸을 숨겨 몸을 보호하고, 입에서 거품을 뿜어내는 '꼬마거북 포켓몬'",
        email: "2423978@naver.com",
        phone: "010-4827-9391",
        website: "https://github.com/anwjrdid",
        oneLiner: "꼬북꼬북",
        img: "images/메타몽_꼬부기.png"
    },
    {
        id: 4,
        name: "메타몽 이상해씨",
        track: "Frontend",
        skills: ["덩굴채찍", "잎날여우불", "솔라빔"],
        summary: "메타몽이 이상해씨로 변신한 모습이다.",
        description: "태어날 때부터 등에 씨앗이 있고, 자라면서 씨앗도 함께 커지는 '씨앗 포켓몬'",
        email: "2423978@naver.com",
        phone: "010-4827-9391",
        website: "https://github.com/anwjrdid",
        oneLiner: "씨익씨익",
        img: "images/메타몽_이상해씨.png"
    },
    {
        id: 5,
        name: "메타몽 파이리",
        track: "Frontend",
        skills: ["불꽃세례", "화염자동차", "화염방사"],
        summary: "메타몽이 파이리로 변신한 모습이다.",
        description: "꼬리 끝에 있는 불꽃으로 감정을 표현하고, 건강하면 강하게 타오르는 '도마뱀 포켓몬'",
        email: "2423978@naver.com",
        phone: "010-4827-9391",
        website: "https://github.com/anwjrdid",
        oneLiner: "파이파이",
        img: "images/메타몽_파이리.png"
    },
    {
        id: 6,
        name: "메타몽 이브이",
        track: "Frontend",
        skills: ["몸통박치기", "애교부리기", "희망사항"],
        summary: "메타몽이 이브이로 변신한 모습이다.",
        description: "주위 환경에 따라 몸의 구성이 바뀌며 여러 모습으로 진화하는 '진화 포켓몬'",
        email: "2423978@naver.com",
        phone: "010-4827-9391",
        website: "https://github.com/anwjrdid",
        oneLiner: "이브이브이",
        img: "images/메타몽_이브이.png"
    },
    {
        id: 7,
        name: "메타몽 망나뇽",
        track: "Frontend",
        skills: ["파괴광선", "용의춤", "신속"],
        summary: "메타몽이 망나뇽으로 변신한 모습이다.",
        description: "바다 위를 날아다니며 조난당한 사람을 돕는 상냥한 마음을 가진 '드래곤 포켓몬'",
        email: "2423978@naver.com",
        phone: "010-4827-9391",
        website: "https://github.com/anwjrdid",
        oneLiner: "망나망나",
        img: "images/메타몽_망나뇽.png"
    },
    {
        id: 8,
        name: "메타몽 또가스",
        track: "Frontend",
        skills: ["오물공격", "독가스", "자폭"],
        summary: "메타몽이 또가스로 변신한 모습이다.",
        description: "얇은 풍선 같은 몸에 독가스가 가득 차 있고 다가가면 냄새가 나는 '독가스 포켓몬'",
        email: "2423978@naver.com",
        phone: "010-4827-9391",
        website: "https://github.com/anwjrdid",
        oneLiner: "또가또가",
        img: "images/메타몽_또가스.png"
    },
    {
        id: 9,
        name: "메타몽 냐옹이",
        track: "Frontend",
        skills: ["마구할퀴기", "고양이돈받기", "속여때리기"],
        summary: "메타몽이 냐옹이로 변신한 모습이다.",
        description: "밤이 되면 활동하는 야행성으로, 반짝거리는 동전을 매우 좋아하는 '나옹 포켓몬'",
        email: "2423978@naver.com",
        phone: "010-4827-9391",
        website: "https://github.com/anwjrdid",
        oneLiner: "냐옹냐옹",
        img: "images/메타몽_냐옹이.png"
    }
]);
  return (
    <>
      <Body />
      <Footer />
    </>
  );
}
export default App