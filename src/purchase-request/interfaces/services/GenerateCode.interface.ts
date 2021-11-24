import { IRGenerateCode } from '../response/GenerateCode.interface';
export interface IGenerateCode {
  generateCode(code: string): Promise<IRGenerateCode>;
}
