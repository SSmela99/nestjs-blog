import { Body, Controller, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './providers/users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  public async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Patch()
  @Auth(AuthType.Bearer)
  public async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return await this.usersService.update(updateUserDto, user);
  }
}
