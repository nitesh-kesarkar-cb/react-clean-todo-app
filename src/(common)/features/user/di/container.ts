import { UserServiceMock } from '../infrastructure/UserServiceMock';

export const userContainer = {
  userService: UserServiceMock,
};

export type UserContainer = typeof userContainer;
