import { Observable } from 'rxjs';

export interface UserService {
  getAll(fields: any): Observable<UserGetAllRes>;
  findById(fields: UserIdReq): Observable<User>;
  create(fields: UserCreateReq): Observable<UserCreateRes>;
  delete(fields: UserIdReq): Observable<void>;
}

export enum UserServiceEnum {
  ServiceName = 'UserService',
  GetAll = 'GetAll',
  FindById = 'FindById',
  Create = 'Create',
  Delete = 'Delete',
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  group: string;
}

export interface UserIdReq {
  id: number;
}

export interface UserGetAllRes {
  users: User[];
}

export interface UserCreateReq {
  name: string;
  email: string;
  password: string;
  group: string;
}

export interface UserCreateRes {
  id: number;
  name: string;
  email: string;
  group: string;
}
