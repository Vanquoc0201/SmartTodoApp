import { BadRequestException, ConflictException, HttpException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET , REFRESH_TOKEN_SECRET } from 'src/common/constant/app.constant';
import { RegisterDto } from './dto/register-auth.dto';
import { LoginDto } from './dto/login-auth.dto';
import { RefreshTokenDto } from './dto/refreshtoken-auth.dto';
import { TokenService } from './token.service';
@Injectable()
export class AuthService {
    constructor(private readonly prismaService : PrismaService , private readonly tokenService : TokenService){}
    async register(body: RegisterDto) {
      try {
        const userExists = await this.prismaService.users.findUnique({
          where: {
            email : body.email,
          },
        });
    
        if (userExists) throw new BadRequestException('User already exists, please login.');
    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(body.password, salt);
        const userNew = await this.prismaService.users.create({
          data: {
            email : body.email,
            password_hash : hashedPassword,
            name : body.name ?? null,
          }
        });
        const { password_hash, ...userWithoutPassword } = userNew;
        return {
          message: 'User registered successfully',
          ...userWithoutPassword,
        };
      } catch (error) {
        console.error('Register error:', error); 
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new ConflictException('Email already exists!');
            }
            // Nếu đã là một HttpException (như BadRequestException), thì throw lại luôn
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException('Server error, please try again later.');
        }
    }
    
    async login(body: LoginDto) {
      const userExists = await this.prismaService.users.findUnique({
        where: {
          email: body.email,
        },
      });
      if (!userExists) {
        throw new BadRequestException('Account not registered please register');
      }
      if (!userExists.password_hash) {
        throw new BadRequestException('Invalid password');
      }
      const isPassword = await bcrypt.compare(body.password, userExists.password_hash);
      if (!isPassword) {
        throw new BadRequestException('Mật khẩu không chính xác');
      }
      const tokens = this.tokenService.createToken(userExists.id);
      return { ...tokens, user: userExists };
    }
    async getUserInfo(user: any) {
      return user;
    }
    async refreshToken(body : RefreshTokenDto) {
      const { accessToken, refreshToken } = body;
    if (!accessToken) {
      throw new UnauthorizedException('No have access token');
    }
    if (!refreshToken) {
      throw new UnauthorizedException('No have refresh token');
    }
    let decodeAccessToken;
    let decodeRefreshToken;
    try {
      decodeAccessToken = jwt.verify(accessToken, ACCESS_TOKEN_SECRET as string, { ignoreExpiration: true });
    } catch (error) {
      throw new UnauthorizedException('Invalid Access Token');
    }
    try {
      decodeRefreshToken = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET as string);
    } catch (error) {
      throw new UnauthorizedException('Invalid Refresh Token');
    }

    if (decodeRefreshToken.userId !== decodeAccessToken.userId) {
      throw new UnauthorizedException('Invalid Token');
    }
    const tokens = this.tokenService.createToken(decodeRefreshToken.userId);
    return {  message :'Token refresh successful', ...tokens };
    }
    
}