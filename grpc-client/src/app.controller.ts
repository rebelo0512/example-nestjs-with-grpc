import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Post,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import {
  User,
  UserCreateReq,
  UserCreateRes,
  UserGetAllRes,
  UserService,
} from './shared/proto/interfaces/UserService';

@Controller()
export class AppController implements OnModuleInit {
  private userGrpcService: UserService;

  constructor(@Inject('USER_PACKAGE') private clientGrpc: ClientGrpc) {}

  onModuleInit() {
    this.userGrpcService =
      this.clientGrpc.getService<UserService>('UserService');
  }

  @Get()
  getAll(): Promise<UserGetAllRes> {
    return lastValueFrom(this.userGrpcService.getAll({}));
  }

  @Get('/:id')
  findById(@Param('id') id: number): Promise<User> {
    return lastValueFrom(this.userGrpcService.findById({ id }));
  }

  @Post()
  create(@Body() data: UserCreateReq): Promise<UserCreateRes> {
    return lastValueFrom(this.userGrpcService.create(data));
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    const user = await lastValueFrom(this.userGrpcService.findById({ id }));

    return this.userGrpcService.delete({ id: user.id });
  }
}
