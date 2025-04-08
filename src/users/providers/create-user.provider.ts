import {
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingProvider } from 'src/auth/providers/hashing.provider';

@Injectable()
export class CreateUserProvider {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly hashingProvider: HashingProvider,
  ) {}
  public async create(createUserDto: CreateUserDto) {
    let isUserExist: User | undefined = undefined;

    try {
      await this.userRepository
        .findOne({
          where: { email: createUserDto.email },
        })
        .then((exactUser) => {
          if (exactUser) {
            isUserExist = exactUser;
          }
        });
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description:
          'Błąd podczas sprawdzania istnienia użytkownika w bazie danych.',
      });
    }

    if (isUserExist) {
      throw new ConflictException(
        'Użytkownik o podanym adresem e-mail już istnieje.',
      );
    }

    let newUser: User;

    try {
      newUser = this.userRepository.create({
        ...createUserDto,
        password: await this.hashingProvider.hashPassword(
          createUserDto.password,
        ),
      });
      await this.userRepository.save(newUser);
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'Błąd podczas tworzenia użytkownika w bazie danych.',
      });
    }

    return newUser;
  }
}
