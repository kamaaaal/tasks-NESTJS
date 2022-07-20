import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { timeStamp } from 'console';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './Dto/authCredentials.dto';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signUp')
  async singUp(@Body() authCredentials: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentials);
  }

  @Post('signIn')
  async signIn(@Body() authCredentials: AuthCredentialsDto) {
    return await this.authService.signIn(authCredentials);
  }

  @Get('findAllUsers')
  async getAllUser() {
    return await this.authService.findAll();
  }

  @UseGuards(AuthGuard())
  @Get('test')
  async joinSelect(@GetUser() request) {
    console.log(request);
    return await this.authService.query();
  }
}
