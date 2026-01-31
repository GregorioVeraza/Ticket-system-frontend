export const ROLES = {
  USER: "user",
  STAFF: "staff",
  PRODUCER: "producer",
  ADMIN: "admin",
} as const;

export const PERMISSIONS = {
  EVENT_VIEW: "event:view",
  TICKET_BUY: "ticket:buy",
  TICKET_VIEW: "ticket:view",
  TICKET_SCAN: "ticket:scan",
  EVENT_CREATE: "event:create",
  EVENT_UPDATE: "event:update",
  EVENT_DELETE: "event:delete",
  STAFF_CREATE: "staff:create",
  ROLE_ASSIGN: "role:assign",
  USER_MANAGE: "user:manage",
} as const;
