export interface Member {
  id: number;
  name: string;
  part: string;
  skills: string[];
  shortIntro: string;
  intro: string;
  phone: string;
  email: string;
  website: string;
  quote: string;
  imgSrc: string;
  isMine: boolean;
  org: string;
}

export interface FormState {
  name: string;
  part: string;
  skills: string;
  shortIntro: string;
  intro: string;
  phone: string;
  email: string;
  website: string;
  quote: string;
}

export type FormErrors = Partial<Record<keyof FormState, string>>;

export interface RandomApiUser {
  name: { first: string; last: string };
  phone: string;
  email: string;
  picture: { medium: string };
  login: { username: string };
}

export interface RandomApiResponse {
  results: RandomApiUser[];
}

// Supabase DB 행 타입 (snake_case)
export interface DbMember {
  id: number;
  name: string;
  part: string;
  skills: string[];
  short_intro: string;
  intro: string;
  phone: string;
  email: string;
  website: string;
  quote: string;
  img_src: string;
  is_mine: boolean;
  org: string;
  created_at: string;
}

export function dbToMember(row: DbMember): Member {
  return {
    id: row.id,
    name: row.name,
    part: row.part,
    skills: row.skills,
    shortIntro: row.short_intro,
    intro: row.intro,
    phone: row.phone,
    email: row.email,
    website: row.website,
    quote: row.quote,
    imgSrc: row.img_src,
    isMine: row.is_mine,
    org: row.org,
  };
}

export function memberToDb(m: Omit<Member, 'id'>): Omit<DbMember, 'id' | 'created_at'> {
  return {
    name: m.name,
    part: m.part,
    skills: m.skills,
    short_intro: m.shortIntro,
    intro: m.intro,
    phone: m.phone,
    email: m.email,
    website: m.website,
    quote: m.quote,
    img_src: m.imgSrc,
    is_mine: m.isMine,
    org: m.org,
  };
}
