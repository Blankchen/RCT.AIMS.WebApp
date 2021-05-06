export interface Asset {
  id: number;
  authorname: string; // translated
  categoryname: string; // translated
  authorid?: number; // id
  category?: number; // id
  rfidCode: string;
  assetname: string;
  issuedBy: number;
  coverimage: string;
}
