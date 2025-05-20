import { Controller, Get, Post, Inject, Body } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

import { NATS_SERVICE } from '../config';

import { RegisterUserDto, LoginUserDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly client: ClientProxy
  ) { }

  @Post('register')
  registerUser(
    @Body() registerUserDto: RegisterUserDto
  ) {
    return this.client.send({ cmd: 'auth.register.user' }, registerUserDto)
      .pipe(
        catchError(error => {
          throw new RpcException(error);
        })
      );
  }

  @Post('login')
  loginUser(
    @Body() loginUserDto: LoginUserDto
  ) {
    return this.client.send({ cmd: 'auth.login.user' }, loginUserDto)
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
