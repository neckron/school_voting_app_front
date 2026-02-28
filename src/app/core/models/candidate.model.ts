export interface Candidate {
  _id: string;
  name: string;
  lastname?: string;
  candidatenumber: string;
  grade?: string;
  pictureURI: string;
  proposals?: string;
  type: 'PERSONERO' | 'BLANK_PERSONERO' | 'CONTRALLOR' | 'BLANK_CONTRALLOR';
}
