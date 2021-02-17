import { Auth } from './auth.repository';

describe('Auth', () => {
  it('should be defined', () => {
    expect(new Auth()).toBeDefined();
  });
});
