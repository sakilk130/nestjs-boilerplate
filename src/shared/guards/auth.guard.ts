import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { config } from 'dotenv';
import * as jwt from 'jsonwebtoken';

import { UsersService } from 'src/modules/users/users.service';

config();

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UsersService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return new Promise(async (resolve, reject) => {
      const req = context.switchToHttp().getRequest();

      try {
        const authorizationHeader = req.headers['authorization'];
        let token: any;
        if (authorizationHeader) {
          token = authorizationHeader.split(' ')[1];
        }
        if (token) {
          const { id } = jwt.verify(token, process.env.JWT_SECRET);
          const currentUser = await this.userService.findOne(id);
          if (!currentUser) {
            reject(new UnauthorizedException('User not found'));
          }
          req.currentUser = currentUser;
          resolve(true);
        } else {
          reject(new UnauthorizedException('No token provided'));
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_) {
        reject(
          new UnauthorizedException('Authentication failed. Please Try again!'),
        );
      }
    });
  }
}
