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
  signup(@Body() signupDto: SignupDto, @Res() response: Response): void {
    this._authService
      .signup(signupDto)
      .then(() => {
        return response.status(HttpStatus.OK).json({
          status: 'success',
          msg: 'Sign up successfully',
        });
      })
      .catch((error) => {
        console.log(error);
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: 'fail',
          msg: error.message,
        });
      });
  }

  @Post('/signin')
  @UsePipes(ValidationPipe)
  signin(@Body() signinDto: SigninDto, @Res() response: Response): void {
    this._authService
      .signin(signinDto)
      .then((token) => {
        return response.status(HttpStatus.OK).json({
          status: 'success',
          token,
        });
      })
      .catch((error) => {
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: 'fail',
          msg: error.message,
        });
      });
  }
}
