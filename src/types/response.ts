export interface IResponseData<T> {
  data: T;
  message: string;
  status: "success" | "error";
}

export interface IResponse {
  message: string;
  status: string;
}