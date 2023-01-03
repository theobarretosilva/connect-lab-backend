import {
  IsString,
  MinLength,
  IsEmail,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { Match } from 'src/core/constraints/match.decorator';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  readonly fullName: string;

  @IsString()
  @IsOptional()
  readonly photoUrl?: string | null =
    'https://github.com/theobarretosilva/Connect-Lab/blob/main/Connect-Lab/src/assets/imgs/userGenerico.png?raw=true';

  @IsString()
  @IsEmail(undefined, { message: 'O e-mail informado não é válido' })
  readonly email: string;

  @IsString()
  @MinLength(8)
  readonly password: string;

  @IsString()
  @MinLength(8)
  @Match('password')
  readonly confirmPassword: string;

  @IsString()
  @IsOptional()
  readonly phone?: string | null;

  @IsString()
  readonly zipCode: string;

  @IsString()
  readonly street: string;

  @IsString()
  readonly number: string;

  @IsString()
  readonly neighborhood: string;

  @IsString()
  readonly city: string;

  @IsString()
  readonly state: string;

  @IsString()
  @IsOptional()
  readonly complement?: string | null;
}
