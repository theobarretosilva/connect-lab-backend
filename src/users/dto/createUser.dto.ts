import {
  IsString,
  MinLength,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Matches,
} from 'class-validator';
import { Match } from 'src/core/constraints/match.decorator';

export class CreateUserDTO {
  @IsNotEmpty({ message: 'O nome completo é obrigatório!' })
  @IsString({ message: 'O nome completo deve ser uma string!' })
  readonly fullName: string;

  @IsString({ message: 'O link da foto deve ser uma string!' })
  @IsOptional()
  readonly photoUrl?: string =
    'https://github.com/theobarretosilva/Connect-Lab/blob/main/Connect-Lab/src/assets/imgs/userGenerico.png?raw=true';

  @IsNotEmpty({ message: 'O email é obrigatório!' })
  @IsString({ message: 'O email deve ser uma string!' })
  @IsEmail(undefined, { message: 'O e-mail informado não é válido!' })
  readonly email: string;

  @IsNotEmpty({ message: 'A senha é um campo obrigatório!' })
  @IsString({ message: 'A senha deve ser uma string!' })
  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres!' })
  readonly password: string;

  @IsNotEmpty({ message: 'A confirmação da senha é obrigatória!' })
  @IsString({ message: 'A confirmação da senha deve ser uma string!' })
  @MinLength(8, {
    message: 'A confirmação da senha deve ter no mínimo 8 caracteres!',
  })
  @Match('password', { message: 'As senhas não estão iguais, revise-as!' })
  readonly confirmPassword: string;

  @IsString({ message: 'O telefone deve ser uma string!' })
  @IsOptional()
  readonly phone?: string | null;

  @IsNotEmpty()
  @IsString()
  readonly zipCode: string;

  @IsNotEmpty()
  @IsString()
  readonly street: string;

  @IsNotEmpty()
  @IsString()
  readonly number: string;

  @IsNotEmpty()
  @IsString()
  readonly neighborhood: string;

  @IsNotEmpty()
  @IsString()
  readonly city: string;

  @IsNotEmpty()
  @IsString()
  readonly state: string;

  @IsString()
  @IsOptional()
  readonly complement?: string | null;
}
