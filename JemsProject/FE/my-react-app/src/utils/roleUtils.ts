export const hasRole = (userRoles: string[] | undefined, allowedRoles: string[]): boolean => {
    if (!userRoles) return false;
    return userRoles.some(role => allowedRoles.includes(role));
  };
  