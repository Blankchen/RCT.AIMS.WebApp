export interface User {
  id: number;
  // get only
  issueCount?: number;
  rfidCode: string;
  firstname: string;
  lastname: string;
  email: string;
  contact: string;
}
