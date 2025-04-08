import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CreateUserProvider } from './create-user.provider';
import { FindUserProvider } from './find-user.provider';

@Injectable()
export class UsersService {
  constructor(
    private readonly createUserProvider: CreateUserProvider,
    private readonly findUserProvider: FindUserProvider,
  ) {}
  public create(createUserDto: CreateUserDto) {
    return this.createUserProvider.create(createUserDto);
  }

  public async findOneById(id: number) {
    return await this.findUserProvider.findById(id);
  }
}
