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
