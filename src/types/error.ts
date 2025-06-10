import { IResponse } from "./response";

export interface IErrorAPI extends IResponse {
  error: string;
}
