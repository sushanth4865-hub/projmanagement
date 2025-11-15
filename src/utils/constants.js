export const UserRolesEnum = {
  ADMIN: "admin",
  PROJEC_ADMIN: "project_admin",
  MEMBER: "member"
}

export const AvailableUserRole = Object.values(UserRolesEnum); // gives above values in array format

export const TaskStausEnum = {
  TODO: "todo",
  IN_PROGRESS: "in_progress",
  DONE: "done"
}

export const AvailableTaskStatuses = Object.values(TaskStausEnum);