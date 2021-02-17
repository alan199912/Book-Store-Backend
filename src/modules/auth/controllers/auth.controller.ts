import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { SignupDto } from '../dto/signup.dto';
import { AuthService } from '../services/auth.service';
import { SigninDto } from '../dto/signin.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('/signup')
  @UsePipes(ValidationPipe) // * ensures that validations are met
  async signup(
    @Body() signupDto: SignupDto,
    @Res() response: Response,
  ): Promise<void> {
    return await this._authService
      .signup(signupDto)
      .then(() => {
        response.status(HttpStatus.OK).json({
          status: 'success',
          msg: 'Sign up successfully',
        });
      })
      .catch((error) => {
        console.log(error);
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: 'fail',
          msg: 'Username or email already exists',
        });
      });
  }

  @Post('/signin')
  @UsePipes(ValidationPipe)
  async signin(
    @Body() signinDto: SigninDto,
    @Res() response: Response,
  ): Promise<void> {
    return await this._authService
      .signin(signinDto)
      .then((token) => {
        response.status(HttpStatus.OK).json({
          status: 'success',
          token,
        });
      })
      .catch((error) => {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: 'fail',
          msg: 'Error to sign in',
        });
      });
  }
}
