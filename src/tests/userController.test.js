/* eslint-disable no-useless-escape */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const httpMocks = require('node-mocks-http');

const {
  createUser, deleteUser, updateUser, getUser, getUsers,
} = require('../controllers/userController');
const db = require('../config/database');

jest.mock('../config/database');

let req;
let res;

beforeEach(async () => {
  await db.query('TRUNCATE TABLE users RESTART IDENTITY CASCADE;');
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

describe('get user info', () => {
  it('it should be a method', () => {
    expect(typeof getUsers).toBe('function');
  });
  it('should return empty User list', async () => {
    await getUsers(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual([]);
  });

  it('should return User list', async () => {
    await db.query(
      'INSERT INTO users (name, username, password, role_id, create_at, update_at) VALUES ($1 , $2, $3, $4, NOW(), NOW()) RETURNING id, name, username, role_id;',
      ['Any F User', 'anyuser', '01234567', '3'],
    );
    await db.query(
      'INSERT INTO users (name, username, password, role_id, create_at, update_at) VALUES ($1 , $2, $3, $4, NOW(), NOW()) RETURNING id, name, username, role_id;',
      ['Any 2 User', 'anyuser02', '01234567', '3'],
    );
    await getUsers(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual(
      [{
        id: 1,
        name: 'Any F User',
        username: 'anyuser',
        role_id: 3,
        role_name: 'waiter',
        create_at: res._getJSONData()[0].create_at,
        update_at: res._getJSONData()[0].update_at,
      },
      {
        id: 2,
        name: 'Any 2 User',
        username: 'anyuser02',
        role_id: 3,
        role_name: 'waiter',
        create_at: res._getJSONData()[1].create_at,
        update_at: res._getJSONData()[1].update_at,
      }],
    );
  });
});

describe('get user info', () => {
  it('it should be a method', () => {
    expect(typeof getUser).toBe('function');
  });
  it('should return User not found', async () => {
    req = {
      params: {
        id: '10',
      },
    };
    await getUser(req, res);
    expect(res.statusCode).toBe(400);
    expect(res._getJSONData()).toEqual({ error: 'User not found, Provide a valid Id' });
  });
  it('if id not integer should return id error', async () => {
    req = {
      params: {
        id: '1.0',
      },
    };
    await getUser(req, res);
    expect(res.statusCode).toBe(400);
    expect(res._getJSONData()).toEqual({ error: 'Provide a valid Id' });
  });
  it('if id not integer should return id error', async () => {
    req = {
      params: {
        id: '1a0',
      },
    };
    await getUser(req, res);
    expect(res.statusCode).toBe(400);
    expect(res._getJSONData()).toEqual({ error: 'Provide a valid Id' });
  });
  it('should return User informations', async () => {
    await db.query(
      'INSERT INTO users (name, username, password, role_id, create_at, update_at) VALUES ($1 , $2, $3, $4, NOW(), NOW()) RETURNING id, name, username, role_id;',
      ['Any F User', 'anyuser', '01234567', '3'],
    );
    req = {
      params: {
        id: '1',
      },
    };
    await getUser(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({
      user: {
        id: 1,
        name: 'Any F User',
        username: 'anyuser',
        role_id: 3,
        role_name: 'waiter',
        create_at: res._getJSONData().user.create_at,
        update_at: res._getJSONData().user.update_at,
      },
    });
  });
});

describe('create user', () => {
  it('it should be a method', () => {
    expect(typeof createUser).toBe('function');
  });
  it('should should catch database error', async () => {
    req = {
      body: {
        username: 'anyuser',
        role_id: '3',
        password: '01234567',
        confirm_password: '01234567',
      },
    };
    await createUser(req, res);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toEqual({ error: 'null value in column "name" of relation "users" violates not-null constraint' });
  });

  it('should return user created', async () => {
    req = {
      body: {
        name: 'Any F User',
        username: 'anyuser',
        role_id: 3,
        password: '01234567',
        confirm_password: '01234567',
      },
    };
    await createUser(req, res);
    expect(res.statusCode).toBe(201);
    expect(res._getJSONData()).toEqual({ message: 'User anyuser created' });
  });
});
// Delete User
describe('delete user', () => {
  it('it should be a method', () => {
    expect(typeof deleteUser).toBe('function');
  });
  it('should return User not found', async () => {
    req = {
      params: {
        id: 10,
      },
    };
    await deleteUser(req, res);
    expect(res.statusCode).toBe(400);
    expect(res._getJSONData()).toEqual({ error: 'User not found, Provide a valid Id' });
  });
  it('if id not integer should return id error', async () => {
    req = {
      params: {
        id: '1.0',
      },
    };
    await deleteUser(req, res);
    expect(res.statusCode).toBe(400);
    expect(res._getJSONData()).toEqual({ error: 'Provide a valid Id' });
  });
  it('if id not integer should return id error', async () => {
    req = {
      params: {
        id: '1a0',
      },
    };
    await deleteUser(req, res);
    expect(res.statusCode).toBe(400);
    expect(res._getJSONData()).toEqual({ error: 'Provide a valid Id' });
  });
  it('should return deleted User', async () => {
    await db.query(
      'INSERT INTO users (name, username, password, role_id, create_at, update_at) VALUES ($1 , $2, $3, $4, NOW(), NOW()) RETURNING id, name, username, role_id;',
      ['Any F User', 'anyuser', '01234567', '3'],
    );
    req = {
      params: {
        id: 1,
      },
    };

    await deleteUser(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({
      message: 'User anyuser deleted',
    });
  });
});

// update User
describe('update user', () => {
  it('it should be a method', () => {
    expect(typeof updateUser).toBe('function');
  });
  it('should return User not found', async () => {
    req = {
      body: {
        id: '10',
      },
    };
    await updateUser(req, res);
    expect(res.statusCode).toBe(400);
    expect(res._getJSONData()).toEqual({ error: 'User not found, Provide a valid Id' });
  });

  it('should return updated User (password only)', async () => {
    await db.query(
      'INSERT INTO users (name, username, password, role_id, create_at, update_at) VALUES ($1 , $2, $3, $4, NOW(), NOW()) RETURNING id, name, username, role_id;',
      ['Any F User', 'anyuser', '01234567', '3'],
    );
    req = {
      body: {
        id: '1',
        password: '012345678',
        confirm_password: '012345678',
      },
    };
    await updateUser(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({
      message: 'User anyuser updated',
    });
  });
  it('should return updated User (role only)', async () => {
    await db.query(
      'INSERT INTO users (name, username, password, role_id, create_at, update_at) VALUES ($1 , $2, $3, $4, NOW(), NOW()) RETURNING id, name, username, role_id;',
      ['Any F User', 'anyuser', '01234567', '3'],
    );
    req = {
      body: {
        id: '1',
        role_id: '2',
      },
    };
    await updateUser(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({
      message: 'User anyuser updated',
    });
  });
});
