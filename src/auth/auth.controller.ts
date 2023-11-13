import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login, SignUp } from './dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async Signup(@Body() body: SignUp, @Res() res) {
    try {
      const result = await this.authService.SignUp(body);
      res.status(200).json({ message: 'SignUp successfully', data: result });
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  }

  @Post('/login')
  async Login(@Body() body: Login, @Res() res) {
    try {
      const result = await this.authService.Login(body);
      res.status(200).json({ data: result });
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  }
}
