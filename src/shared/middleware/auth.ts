import {
  Inject,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserRepository } from '../repositories/user.repository';
import { decodeAuthToken } from '../utility/token-generator';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @Inject(UserRepository) private readonly userDB: UserRepository,
  ) {}

  async use(req: Request | any, res: Response, next: NextFunction) {
    try {
      console.log('AuthMiddleware', req.headers);
      console.log(req.cookies._digi_auth_token);
      const token = req.cookies._digi_auth_token;
      // console.log(token);
      if (!token) {
        throw new UnauthorizedException(`Missing auth token ${token}`);
      }
      const decodedData: any = decodeAuthToken(token);
      const user = await this.userDB.findById(decodedData.id);
      if (!user) {
        throw new UnauthorizedException('Unauthorized');
      }
      user.password = undefined;
      req.user = user;
      next();
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
