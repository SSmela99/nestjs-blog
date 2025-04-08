import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsUrl,
  IsOptional,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Imie musi być stringiem.' })
  @IsNotEmpty({ message: 'Imię nie może być puste.' })
  @MinLength(3, { message: 'Imię musi składać się z co najmniej 3 znaków.' })
  @MaxLength(96, { message: 'Maksymalna długość imienia wynosi 96 znaków.' })
  firstname: string;

  @IsString({ message: 'Nazwisko musi być stringiem.' })
  @IsNotEmpty({ message: 'Nazwisko nie może być puste.' })
  @MinLength(3, {
    message: 'Nazwisko musi składać się z co najmniej 3 znaków.',
  })
  @MaxLength(96, { message: 'Maksymalna długość nazwiska wynosi 96 znaków.' })
  lastname: string;

  @IsString({ message: 'Hasło musi być stringiem.' })
  @IsNotEmpty({ message: 'Hasło nie może być puste.' })
  @MinLength(8, { message: 'Hasło musi składać się z co najmniej 8 znaków.' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      'Hasło musi składać się z co najmniej 8 znaków, w tym jednej cyfry i jednego znaku specjalnego.',
  })
  password: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email nie może być puste.' })
  @MaxLength(96, {
    message: 'Maksymalna długość adresu email wynosi 96 znaków.',
  })
  email: string;

  @IsUrl()
  @IsOptional()
  @MaxLength(1024, {
    message: 'Maksymalna długość url wynosi 1024 znaków.',
  })
  avatar: string;
}
