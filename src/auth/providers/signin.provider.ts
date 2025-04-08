import {
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { SigninDto } from '../dtos/signin.dto';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingProvider } from './hashing.provider';
import { GenerateTokensProvider } from './generate-tokens.provider';

@Injectable()
export class SigninProvider {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly hashingProvider: HashingProvider,
    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {}
  public async signIn(signinDto: SigninDto) {
    let existingUser: User | null = null;
    let isPasswordValid = false;

    try {
      existingUser = await this.usersRepository.findOne({
        where: { email: signinDto.email },
      });
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'Wystąpił błąd podczas pobierania danych.',
      });
    }

    if (!existingUser) {
      throw new ConflictException(
        'Użytkownik o podanym adresem e-mail nie istnieje.',
      );
    }

    if (existingUser) {
      isPasswordValid = await this.hashingProvider.comparePassword(
        signinDto.password,
        existingUser.password,
      );

      if (isPasswordValid)
        return await this.generateTokensProvider.generateTokens(existingUser);
    }
  }
}
