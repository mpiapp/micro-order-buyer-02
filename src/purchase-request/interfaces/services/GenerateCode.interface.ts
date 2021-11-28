import { IRGenerateCode } from '../response/GenerateCode.interface';
export interface IGenerateCodeService {
  generateCode(code: string): Promise<IRGenerateCode>;
}
