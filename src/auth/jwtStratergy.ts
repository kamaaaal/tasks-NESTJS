import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt,Strategy, StrategyOptions } from 'passport-jwt';
import { Repository } from "typeorm";
// import { Strategy } from "passport";
import { authPayload } from "./Dto/jwtPayload";
import { Users } from "./entities/user.entity";
import { UsersRepository } from "./repositories/users.repository";

// console.log(ExtractJwt.fromAuthHeaderAsBearerToken());
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(Users)
        private userRepository : Repository<Users>
    )
    {
        super({
            secretOrKey : "topSecret21",
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
        // const strategyOption :StrategyOptions =  {
        //     jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
        //      secretOrKey : "topSecret21",
        // }
    }

    async validate(payload : authPayload): Promise<Users>{
        const {username} = payload;
        console.log(payload);
        console.log(username);
        // get the user 
        const user = await this.userRepository.findOne({where : {username}});
        
        if(!user) throw new UnauthorizedException();

        else return user;
    }
}