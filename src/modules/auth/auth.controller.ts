import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.authService.register(registerDto);
    return {
      status: 200,
      message: 'Registration successful',
      data: user,
    };
  }

  @Post('sign-in')
  async login(@Body() loginDto: SignInDto) {
    const user = await this.authService.signIn(loginDto);
    return {
      status: 200,
      message: 'Login successful',
      data: user,
    };
  }
}
