import { AuthRepository } from '../repositories/auth.repository';

describe('Auth', () => {
  it('should be defined', () => {
    expect(new AuthRepository()).toBeDefined();
  });
});
