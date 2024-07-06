export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type GetUserRequestType = {
  field: string;
  searchType: "byField" | "fuzzySearch" ;
  searchText?: string;
};
