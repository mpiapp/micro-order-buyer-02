import { RpcException } from '@nestjs/microservices';
import { ExceptionFilter } from './rpc-exception.filter';

describe('RpcException', () => {
  describe('when string passed', () => {
    let instance, error;
    beforeEach(() => {
      instance = new ExceptionFilter();

      error = new RpcException('Invalid credentials.');
    });
    it('should be Defined', () => {
      expect(instance.catch).toBeDefined();
    });
    it('should set the message property', () => {
      try {
        instance.catch(error);
      } catch (e) {
        expect(e).toBe('RpcException[Error]');
      }
    });
  });
});
