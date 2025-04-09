import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CreateUserProvider } from './create-user.provider';
import { FindUserProvider } from './find-user.provider';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UpdateUserProvider } from './update-user.provider';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Injectable()
export class UsersService {
  constructor(
    private readonly createUserProvider: CreateUserProvider,
    private readonly findUserProvider: FindUserProvider,
    private readonly updateUserProvider: UpdateUserProvider,
  ) {}
  public async create(createUserDto: CreateUserDto) {
    return await this.createUserProvider.create(createUserDto);
  }

  public async update(
    updateUserDto: UpdateUserDto,
    activeUser: ActiveUserData,
  ) {
    return await this.updateUserProvider.update(updateUserDto, activeUser);
  }

  public async findOneById(id: number) {
    return await this.findUserProvider.findById(id);
  }
}
