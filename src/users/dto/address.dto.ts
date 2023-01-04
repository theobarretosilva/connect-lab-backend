import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AddressDTO {
  @IsNotEmpty({ message: 'O CEP é obrigatório!' })
  @IsString({ message: 'O CEP deve ser uma string!' })
  readonly zipCode: string;

  @IsNotEmpty({ message: 'A rua é obrigatória!' })
  @IsString({ message: 'A rua deve ser uma string!' })
  readonly street: string;

  @IsNotEmpty({ message: 'O número da sua residência é obrigatório!' })
  @IsNumber()
  readonly number: number;

  @IsNotEmpty({ message: 'O seu bairro é obrigatório!' })
  @IsString({ message: 'O bairro deve ser uma string!' })
  readonly neighborhood: string;

  @IsNotEmpty({ message: 'A cidade é obrigatória!' })
  @IsString({ message: 'A cidade deve ser uma string!' })
  readonly city: string;

  @IsNotEmpty({ message: 'O estado é obrigatório!' })
  @IsString({ message: 'O estado deve ser uma string!' })
  readonly state: string;

  @IsString()
  @IsOptional()
  readonly complement?: string | null;
}
