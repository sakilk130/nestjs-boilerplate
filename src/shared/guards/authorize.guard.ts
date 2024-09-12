import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  mixin,
} from '@nestjs/common';

export const AuthorizeGuard = (allowedRoles: string[]) => {
  class RolesGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest();
      const user = request.currentUser;
      if (!user) {
        throw new UnauthorizedException('Sorry, you are not authorized.');
      }
      const result = allowedRoles.includes(user.role);
      if (!result) {
        throw new UnauthorizedException('Sorry, you are not authorized.');
      }
      return result;
    }
  }
  const guard = mixin(RolesGuardMixin);
  return guard;
};
