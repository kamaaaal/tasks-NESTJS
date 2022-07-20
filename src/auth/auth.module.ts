import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { Users } from './entities/user.entity';
import { UsersRepository } from './repositories/users.repository';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwtStratergy';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy : 'jwt',
    }),
    JwtModule.register({
      secret : 'topSecret21',
      signOptions : {
        expiresIn : 3600
      }
    }),
    TypeOrmModule.forFeature([Users])
  ],
  providers: [AuthService,UsersRepository,JwtStrategy],
  controllers: [AuthController],
  exports : [JwtStrategy,PassportModule],
})
export class AuthModule {}
