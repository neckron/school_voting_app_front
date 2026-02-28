import { Candidate } from './candidate.model';

export interface VoteResult {
  _id: string | null;
  quantity: number;
  candidate: Candidate[];
}

export interface LocationResult {
  _id: string;
  votosPersoneros?: { personero: string; count: number }[];
  votosContralores?: { contralor: string; count: number }[];
}
