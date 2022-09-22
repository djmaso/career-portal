/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

export interface ICategoryListResponse {
  idCount: number,
  publishedCategory: { id: number, name: string };
}
interface IAddressListResponse {
  idCount: number,
  address: { city: string, state: string };
}
interface IEmploymentTypeListResponse {
  idCount: number,
  employmentType: string;
}
interface IRequiredSecurityClearance {
  idCount: number,
  customText3: string;
}
