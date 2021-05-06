import { Asset } from './asset';

export interface Circulation {
  id: number;
  memberid: number;
  membername: string;
  email: string;
  issuedate: Date;
  dueDate: Date;
  returndate: Date;
  status: boolean;
  assets: Asset[];
}

