export const UserStatus = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  DELETED: "deleted",
} as const;

export type UserStatusType = (typeof UserStatus)[keyof typeof UserStatus];

export const statusLabelMap: Record<UserStatusType, string> = {
  active: "Активный",
  inactive: "Неактивный",
  deleted: "Удалённый",
};
