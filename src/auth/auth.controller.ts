import { Body, Controller, Post } from "@nestjs/common";
import { UserEntity } from "./user.entity";
import { AuthCredentialDto } from "./dto/authCredential.dto";
import { AuthService } from "./auth.service";
import { UserResponseInterface } from "./types/userResponce.inteface";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('/signup')
  async signUp(@Body() authCredentialDto: AuthCredentialDto):Promise<UserResponseInterface>{
    const user = await this.authService.createUser(authCredentialDto)
    return this.authService.userWithToken(user)
  }

  @Post('/signin')
  async signIn(@Body() authCredentialDto: AuthCredentialDto):Promise<UserResponseInterface>{
    const user = await this.authService.signIn(authCredentialDto)
    return this.authService.userWithToken(user)
  }
}
