import { UserMiddleware } from './user.middleware';

describe('MiddlewareMiddleware', () => {
  it('should be defined', () => {
    expect(new UserMiddleware()).toBeDefined();
  });
});
