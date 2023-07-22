import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { BodyWithUser } from 'src/types/body';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterDTO) {
    return await this.authService.register(body);
  }
  @Post('login')
  async login(@Body() body: LoginDTO) {
    return await this.authService.login(body);
  }
  @Get('me')
  async me(@Body() body: any) {
    const { user } = body as BodyWithUser<unknown>;
    return await this.authService.hydrateUser(user.id);
  }
}
