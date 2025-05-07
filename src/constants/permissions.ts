import {
  PERMISSION_PERMISSIONS,
  ROLE_PERMISSIONS,
  USER_PERMISSIONS,
} from 'src/shared/enums/permissions.enum';

export const permissions = [
  ...Object.values(USER_PERMISSIONS.permissions).map((permission) => ({
    name: permission,
    description: `Ability to ${permission.split('_')[1].toLowerCase()} users`,
    status: true,
    module_name: USER_PERMISSIONS.MODULE_NAME,
  })),
  ...Object.values(ROLE_PERMISSIONS.permissions).map((permission) => ({
    name: permission,
    description: `Ability to ${permission.split('_')[1].toLowerCase()} roles`,
    status: true,
    module_name: ROLE_PERMISSIONS.MODULE_NAME,
  })),
  ...Object.values(PERMISSION_PERMISSIONS.permissions).map((permission) => ({
    name: permission,
    description: `Ability to ${permission.split('_')[1].toLowerCase()} permissions`,
    status: true,
    module_name: PERMISSION_PERMISSIONS.MODULE_NAME,
  })),
];
