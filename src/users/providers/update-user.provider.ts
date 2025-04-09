import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Injectable()
export class UpdateUserProvider {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
  public async update(
    updateUserDto: UpdateUserDto,
    activeUser: ActiveUserData,
  ) {
    let user: User | null;

    try {
      user = await this.usersRepository.findOne({
        where: { id: activeUser.sub },
      });
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'Wystąpił problem z pobieraniem danych.',
      });
    }

    if (!user) {
      throw new BadRequestException('Nie znaleziono użytkownika o danym id.');
    }

    try {
      const updatedUser = await this.usersRepository.save({
        ...user,
        ...updateUserDto,
      });

      return updatedUser;
    } catch (error) {
      throw new BadRequestException(error, {
        description: 'Wystąpił problem z pobieraniem danych',
      });
    }
  }
}
