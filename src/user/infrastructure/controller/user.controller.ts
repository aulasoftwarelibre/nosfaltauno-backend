import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  ForbiddenException,
  UseGuards,
  Request,
  Get,
  NotFoundException,
  Param,
  Put,
  Logger,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UserDto } from '../dto/user.dto';
import { UserService } from '../service/user.service';
import { UserId } from '../../domain/model/user-id';
import { UserView } from '../read-model/schema/user.schema';
import { UserIdNotFoundError } from 'src/user/domain/exception/user-id-not-found.error';
import { UserIdAlreadyRegisteredError } from 'src/user/domain/exception/user-id-already-registered.error';
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get User' })
  @ApiResponse({ status: 204, description: 'Get User.' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @Get(':id')
  async getUser(@Param() params): Promise<UserView> {
    const logger = new Logger('UserController');
    logger.log('Petición GET Users');
    try {
      return await this.userService.getUser(params.id);
    } catch (e) {
      if (e instanceof UserIdNotFoundError) {
        throw new NotFoundException('User not found');
      } else if (e instanceof Error) {
        throw new BadRequestException(`Unexpected error: ${e.message}`);
      } else {
        throw new BadRequestException('Server error');
      }
    }
  }

  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: 204, description: 'Create User.' })
  @HttpCode(204)
  @Post()
  async createUser(@Body() userDto: UserDto, @Request() req): Promise<UserDto> {
    const logger = new Logger('UserController');
    logger.log('Petición POST Users');
    const idUser: UserId = req.user;

    if (idUser.value !== userDto._id) {
      throw new ForbiddenException('Forbidden access to data');
    }

    try {
      return await this.userService.createUser(
        userDto._id,
        userDto.name,
        userDto.email,
        userDto.avatar,
      );
    } catch (e) {
      if (e instanceof UserIdAlreadyRegisteredError) {
        throw new ConflictException(e.message);
      } else if (e instanceof Error) {
        throw new BadRequestException(`Unexpected error: ${e.message}`);
      } else {
        throw new BadRequestException('Server error');
      }
    }
  }
}
