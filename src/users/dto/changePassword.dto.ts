import { IsEmail, IsString } from 'class-validator';

export class ChangePasswordDTO {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly oldPassword: string;

  @IsString()
  readonly newPassword: string;

  @IsString()
  readonly confirmNewPassword: string;
}
