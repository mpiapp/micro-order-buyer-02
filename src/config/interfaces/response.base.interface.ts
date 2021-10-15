export interface BaseResponse {
  status: number;
  message: string;
  errors: { [key: string]: any } | null;
}
