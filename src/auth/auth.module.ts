import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import * as dotenv from 'dotenv';
import { JwtStrategy } from "./jwt.strategy";
dotenv.config();

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({secret: process.env.JWT_SECRET}),
    TypeOrmModule.forFeature([UserEntity])],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports:[JwtStrategy, PassportModule]
})
export class AuthModule {}
