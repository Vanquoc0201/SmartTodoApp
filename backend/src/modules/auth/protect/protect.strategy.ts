import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException} from '@nestjs/common';
import { ACCESS_TOKEN_SECRET } from 'src/common/constant/app.constant';
import { PrismaService } from 'src/modules/prisma/prisma.service';


@Injectable()
export class ProtectStrategy extends PassportStrategy(Strategy, 'protect') {
  constructor(private readonly prismaService : PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ACCESS_TOKEN_SECRET || 'CANNOT GET TOKEN IN ENV',
    });
  }

  async validate(payload: any) {
    const user = await this.prismaService.users.findUnique({
        where: {
           id: payload.id,
        },
     });
     if (!user) {
        throw new UnauthorizedException(`User not found`);
    }
    return user;
    ;
  }
}