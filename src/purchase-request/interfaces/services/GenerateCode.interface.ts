import { IRGenerateCode } from '../response/GenerateCode.interface';
import { CodePRDto } from './../../dto/CodePR.dto';
export interface IGenerateCode {
  generateCode(code: CodePRDto): Promise<IRGenerateCode>;
}
