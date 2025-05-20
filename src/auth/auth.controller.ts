import { Controller, Get, Post, Inject } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from '../config';
import { catchError } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly client: ClientProxy
  ) { }

  @Post('register')
  registerUser() {
    return this.client.send({ cmd: 'auth.register.user' }, {})
      .pipe(
        catchError(error => {
          throw new RpcException(error);
        })
      );
  }

  @Post('login')
  loginUser() {
    return this.client.send({ cmd: 'auth.login.user' }, {})
      .pipe(
        catchError(error => {
          throw new RpcException(error);
        })
      );
  }

  @Get('verify')
  verifyToken() {
    return this.client.send({ cmd: 'auth.verify.user' }, {})
      .pipe(
        catchError(error => {
          throw new RpcException(error);
        })
      );
  }

}
