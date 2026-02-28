export interface User {
  _id: string;
  name: string;
  username: string;
  userrole: 'ADMIN' | 'VOTER';
  grade?: string;
  location?: string;
  course?: string;
  vote: boolean;
}
