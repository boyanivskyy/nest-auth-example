import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionType } from 'src/iam/permission.type';
import { PERMISSION_KEY } from '../../decorators/permissions.decorator';
import { REQUEST_USER_KEY } from 'src/iam/iam.constants';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const contextPermissions = this.reflector.getAllAndOverride<
      PermissionType[]
    >(PERMISSION_KEY, [context.getHandler(), context.getClass()]);
    if (!contextPermissions) {
      return true;
    }
    const user = context.switchToHttp().getRequest()[REQUEST_USER_KEY];
    return contextPermissions.every((permission) =>
      user.permissions?.includes(permission),
    );
  }
}
