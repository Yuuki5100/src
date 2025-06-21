// roleUtils.test.ts
import { hasRole } from '@utils/roleUtils';

describe('hasRole', () => {
  it('should return true when user has at least one allowed role', () => {
    const userRoles = ['ADMIN', 'USER'];
    const allowedRoles = ['MODERATOR', 'USER'];
    expect(hasRole(userRoles, allowedRoles)).toBe(true);
  });

  it('should return false when user has none of the allowed roles', () => {
    const userRoles = ['GUEST', 'VIEWER'];
    const allowedRoles = ['ADMIN', 'USER'];
    expect(hasRole(userRoles, allowedRoles)).toBe(false);
  });

  it('should return false when userRoles is undefined', () => {
    const userRoles = undefined;
    const allowedRoles = ['ADMIN'];
    expect(hasRole(userRoles, allowedRoles)).toBe(false);
  });

  it('should return false when userRoles is an empty array', () => {
    const userRoles: string[] = [];
    const allowedRoles = ['ADMIN'];
    expect(hasRole(userRoles, allowedRoles)).toBe(false);
  });

  it('should return false when allowedRoles is empty', () => {
    const userRoles = ['ADMIN'];
    const allowedRoles: string[] = [];
    expect(hasRole(userRoles, allowedRoles)).toBe(false);
  });

  it('should return false when both arrays are empty', () => {
    const userRoles: string[] = [];
    const allowedRoles: string[] = [];
    expect(hasRole(userRoles, allowedRoles)).toBe(false);
  });

  it('should return true when roles exactly match', () => {
    const userRoles = ['ADMIN'];
    const allowedRoles = ['ADMIN'];
    expect(hasRole(userRoles, allowedRoles)).toBe(true);
  });
});
