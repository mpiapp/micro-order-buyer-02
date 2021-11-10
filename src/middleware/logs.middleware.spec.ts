import { Next } from '@nestjs/common';
import { LoggerMiddleware } from './logs.middleware';

const request = {
  ip: '111.222.333.444',
  method: 'GET',
  originalUrl: expect.any(String),
  get: function (param = 'user-agent') {
    return param;
  },
};

const response = {
  on: function (event = 'finish') {
    return event;
  },
  statusCode: 200,
  get: function (paran) {
    return paran;
  },
};

describe('logs', () => {
  let classes;
  beforeEach(() => {
    classes = new LoggerMiddleware();
  });

  it('should be check function use', () => {
    expect(classes.use(request, response, Next)).toBe(undefined);
  });

  it('should be check function use if request get false', () => {
    expect(
      classes.use(
        {
          ...request,
          get: function () {
            return false;
          },
        },
        response,
        Next,
      ),
    ).toBe(undefined);
  });
});
