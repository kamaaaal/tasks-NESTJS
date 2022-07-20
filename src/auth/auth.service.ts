import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { AuthCredentialsDto } from './Dto/authCredentials.dto';
import { authPayload } from './Dto/jwtPayload';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class AuthService {
  findAll() {
    return this.userRepsotitory.findAllUser();
  }
    constructor(private userRepsotitory: UsersRepository,
                private jwtService : JwtService,
      ) {}
    query() {
        return this.userRepsotitory.query()
    }
  /// service containes businnes logic so in service we call it signup
  /// but in repo (to the context of repo) we call it a createUser
  /// create functionality doesn't need to respond always
  /// so we just return void
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
      const saved = await this.userRepsotitory.createUser(authCredentialsDto);
  }

  /// sign in functionality 
  async signIn(authCredentials : AuthCredentialsDto){
    const {username,password} = authCredentials;
    const foundUser = await this.userRepsotitory.findByName(username);

    if (foundUser && await compare(password,foundUser.password)){
        const payload : authPayload= {username};
        const accesstoken = await this.jwtService.sign(payload)
        // after creating a token we send that token wrapped in a object
        return {accesstoken};
    }
    else {
        throw new UnauthorizedException({message : `user credentials not verified`});
    }
  }
}
