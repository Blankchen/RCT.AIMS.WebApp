export interface AssetForm {
  // id=0 mean create, otherwise update
  id: number;
  assetname: string;
  authorId: number;
  // same as id
  category: number;
  rfidCode: string;
  coverimage?: File;
}
