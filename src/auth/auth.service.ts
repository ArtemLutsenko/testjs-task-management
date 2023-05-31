import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";
import { AuthCredentialDto } from "./dto/authCredential.dto";
import {compare} from 'bcrypt'
import { JwtService } from "@nestjs/jwt";
import { UserResponseInterface } from "./types/userResponce.inteface";

@Injectable()
export class AuthService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
              private readonly jwtService:JwtService) {
  }

  async createUser(authCredentialDto: AuthCredentialDto): Promise<UserEntity>{
    const user = new UserEntity()
    Object.assign(user, authCredentialDto)
    try {

      return await this.userRepository.save(user)
    } catch (e){
      if(e.code === '23505'){
        throw new HttpException('User exist', HttpStatus.UNPROCESSABLE_ENTITY)
      } else{
        throw new HttpException(e.message, HttpStatus.UNPROCESSABLE_ENTITY)
      }
    }

  }

  async signIn(authCredentialDto: AuthCredentialDto): Promise<UserEntity>{
    const user = await this.userRepository.findOne({
      where: { username: authCredentialDto.username },
      select: ['id', "username", "password"]
    })

    if(!user){
      throw new HttpException('Username or password incorrect', HttpStatus.UNPROCESSABLE_ENTITY)
    }
    const  isPasswordCorrect = await compare(authCredentialDto.password, user.password)

    if(!isPasswordCorrect){
      throw new HttpException('Username or password incorrect', HttpStatus.UNPROCESSABLE_ENTITY)
    }

    delete user.password
    return user

  }

  async userWithToken(user: UserEntity): Promise<UserResponseInterface>{
    return {...user,
      token: this.jwtService.sign(user.username)}
  }
}
