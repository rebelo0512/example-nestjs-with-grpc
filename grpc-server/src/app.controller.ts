import { Logger, OnModuleInit } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import {
  User,
  UserCreateReq,
  UserCreateRes,
  UserGetAllRes,
  UserIdReq,
  UserServiceEnum,
} from './shared/proto/interfaces/UserService';

const users: User[] = [];

export class AppController implements OnModuleInit {
  private readonly logger = new Logger(AppController.name);

  onModuleInit() {
    this.logger.log(
      'AppController Init - Methods [GetAll, FindById, Create, Delete]',
    );
  }

  @GrpcMethod(UserServiceEnum.ServiceName, UserServiceEnum.GetAll)
  async getAll(): Promise<UserGetAllRes> {
    return { users };
  }

  @GrpcMethod(UserServiceEnum.ServiceName, UserServiceEnum.FindById)
  async findById({ id: user_id }: UserIdReq): Promise<User> {
    const users_filtered = users.filter(({ id }) => id == user_id);

    if (users_filtered.length == 0)
      throw new RpcException('Usuário Não encontrado');

    const user = users_filtered[0];

    return user;
  }

  @GrpcMethod(UserServiceEnum.ServiceName, UserServiceEnum.Create)
  async create({
    email,
    group,
    name,
    password,
  }: UserCreateReq): Promise<UserCreateRes> {
    const id = users.length + 1;

    users.push({
      id,
      name,
      email,
      group,
      password,
    });

    return {
      id,
      name,
      email,
      group,
    };
  }

  @GrpcMethod(UserServiceEnum.ServiceName, UserServiceEnum.Delete)
  async delete({ id: user_id }: UserIdReq): Promise<void> {
    const user_filtered = users.findIndex(({ id }) => id == user_id);

    if (user_filtered == -1) throw new RpcException('Usuário Não encontrado');

    users.splice(user_filtered, 1);
  }
}
