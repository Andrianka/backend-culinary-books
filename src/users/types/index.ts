export const UserRole = {
  ADMIN: 'ADMIN',
  MODERATOR: 'MODERATOR',
  USER: 'USER',
} as const;

export type UserRoleType = (typeof UserRole)[keyof typeof UserRole];
