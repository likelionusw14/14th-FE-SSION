const PARTS = ['Frontend', 'Backend', 'Design']
const SKILLS = {
  Frontend: ['JavaScript', 'React', 'HTML/CSS', 'Vue', 'TypeScript'],
  Backend: ['Node.js', 'Python', 'Java', 'Django', 'Spring'],
  Design: ['Figma', 'Sketch', 'Illustrator', 'Photoshop', 'XD'],
}

const BIOS = [
  '데이터가 바뀌면 UI도 바뀐다!',
  '코드로 세상을 바꾸는 중입니다.',
  '매일 성장하는 아기사자입니다.',
  '협업과 소통을 즐기는 개발자입니다.',
  '새로운 기술에 항상 도전합니다.',
]

let idCounter = 1000

export function transformUser(user) {
  const part = PARTS[Math.floor(Math.random() * PARTS.length)]
  const skills = SKILLS[part]
  const skill = skills[Math.floor(Math.random() * skills.length)]
  const bio = BIOS[Math.floor(Math.random() * BIOS.length)]
  const fullName = `${user.name.first} ${user.name.last}`
  const city = user.location.city
  const country = user.location.country

  return {
    id: ++idCounter,
    name: fullName,
    part,
    skill,
    intro: `${part} · ${country} ${city}에서 참류행이요!`,
    tag: `${part}에서 참류행이요!`,
    bio,
    email: user.email,
    phone: user.phone,
    website: `https://example.com/${user.login.username}`,
    comment: bio,
    profileImage: user.picture.large,
  }
}

export async function fetchLions(count) {
  const res = await fetch(
    `https://randomuser.me/api/?results=${count}&nat=us,gb,ca,au,nz`
  )
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
  const data = await res.json()
  return data.results.map(transformUser)
}
