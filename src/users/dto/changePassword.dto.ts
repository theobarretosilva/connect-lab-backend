import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Match } from 'src/core/constraints/match.decorator';

export class ChangePasswordDTO {
  @IsNotEmpty({ message: 'O email é obrigatório!' })
  @IsString({ message: 'O email deve ser uma string!' })
  @IsEmail(undefined, { message: 'O e-mail informado não é válido!' })
  readonly email: string;

  // @IsNotEmpty({ message: 'A senha é um campo obrigatório!' })
  // @IsString({ message: 'A senha deve ser uma string!' })
  // @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres!' })
  readonly oldPassword: string;

  @IsString()
  readonly newPassword: string;

  @IsString()
  @Match('newPassword', {
    message: 'As suas novas senhas não estão iguais, revise-as!',
  })
  readonly confirmNewPassword: string;
}
