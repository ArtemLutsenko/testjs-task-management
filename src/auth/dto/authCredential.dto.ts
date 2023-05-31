import { IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialDto {
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  username: string

  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password is to weak'})
  password: string
}
