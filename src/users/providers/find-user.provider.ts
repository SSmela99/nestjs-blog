import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';

@Injectable()
export class FindUserProvider {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async findById(id: number) {
    let user: User | null;

    try {
      user = await this.userRepository.findOne({ where: { id } });
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'Wystąpił błąd podczas pobierania danych.',
      });
    }

    if (!user) {
      throw new BadRequestException('Nie znaleziono użytkownika o podanym ID.');
    }

    return user;
  }
}
