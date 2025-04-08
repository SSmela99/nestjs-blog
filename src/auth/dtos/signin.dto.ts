import { IsNotEmpty, IsString } from 'class-validator';

export class SigninDto {
  @IsNotEmpty({ message: 'Email nie może być pusty.' })
  @IsString({ message: 'Email musi być stringiem.' })
  email: string;

  @IsNotEmpty({ message: 'Hasło nie może być puste.' })
  @IsString({ message: 'Hasło musi być stringiem.' })
  password: string;
}
