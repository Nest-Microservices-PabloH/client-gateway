import { Controller, Get, Post, Inject, Body, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

import { NATS_SERVICE } from '../config';

import { CurrentUser } from './interfaces/current-user.interface';
import { RegisterUserDto, LoginUserDto } from './dto';
import { AuthGuard } from './guards/auth.guard';
import { User, Token } from './decorators';

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

  @UseGuards(AuthGuard)
  @Get('verify')
  verifyToken(@User() user: CurrentUser, @Token() token: string) {
    return { user, token };
    // return this.client.send({ cmd: 'auth.verify.user' }, {})
    //   .pipe(
    //     catchError(error => {
    //       throw new RpcException(error);
    //     })
    //   );
  }

}
