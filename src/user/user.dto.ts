import { IsEmail, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  username: string;
}

export class SignInDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class GeneralUserDto {
  @Exclude()
  id: number;

  @Expose()
  email: string;

  @Expose()
  username: string;

  @Exclude()
  password: string;
}
