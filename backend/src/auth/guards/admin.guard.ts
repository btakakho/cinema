import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common'
import { UserModel } from 'src/user/user.model'

export class OnlyAdminGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const request = ctx.switchToHttp().getRequest<{ user: UserModel }>()
    const user = request.user

    if (!user.isAdmin) throw new ForbiddenException('You have no rights')

    return user.isAdmin
  }
}
