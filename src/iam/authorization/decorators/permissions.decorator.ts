import { SetMetadata } from '@nestjs/common';
import { PermissionType } from 'src/iam/permission.type';

export const PERMISSION_KEY = 'permissions';

export const Permissions = (...permissions: PermissionType[]) =>
  SetMetadata(PERMISSION_KEY, permissions);
