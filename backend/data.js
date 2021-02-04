import bcrypt from 'bcryptjs';

export const data = {
  users: [
    {
      name: 'admin',
      email: 'admin@test.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: true,
    },
    {
      name: 'test',
      email: 'test@test.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: false,
    },
  ],
  tasks: [
    {
      name: 'Test User',
      email: 'test_user_1@example.com',
      text: 'Hello, world!',
      status: 10,
    },
    {
      name: 'Test User 2',
      email: 'test_user_2@example.com',
      text: 'Hello from user 2!',
      status: 0,
    },
    {
      name: 'Test User 3',
      email: 'test_user_3@example.com',
      text: 'Hello from user 3!',
      status: 0,
    },
  ],
};
