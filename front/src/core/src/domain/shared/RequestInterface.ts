interface MetaData {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface PaginationInterface<T> {
  data: T[];
  meta: MetaData;
}

export interface RequestInterface<T> {
  item: T;
}
