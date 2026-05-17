
export interface Lion {
  id: number;
  isMe: boolean;
  image: string;
  name: string;
  part: string;
  interests: string[];
  oneLine: string;
  contact: {
    email: string;
    phone?: string;
  };
  message: string;
}

export interface ApiStatus {
  text: string;
  color: string;
}