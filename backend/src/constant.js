export const UserRolesEnum = {
  ADMIN: "ADMIN",
  USER: "USER",
};

export const AvailableUserRoles = Object.values(UserRolesEnum);
export const OrderStatusEnum = {
  PENDING: "PENDING",
  CANCELLED: "CANCELLED",
  DELIVERED: "DELIVERED",
};

export const AvailableOrderStatus = Object.values(OrderStatusEnum);
export const USER_TEMPORARY_TOKEN_EXPIRY = 20 * 60 * 1000;
export const DB_NAME = "parceldelivery";
