/* eslint-disable no-useless-escape */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const httpMocks = require('node-mocks-http');
const bcrypt = require('bcrypt');

const {
  createSession,
} = require('../controllers/sessionController');
const db = require('../configs/database');

jest.mock('../configs/database');

let req;
let res;

beforeEach(async () => {
  await db.query('TRUNCATE TABLE users RESTART IDENTITY CASCADE;');
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

describe('create sessions', () => {
  it('it should be a method', () => {
    console.log(process.env.PORT);
    expect(typeof createSession).toBe('function');
  });
  it('should wrong email or password(no user)', async () => {
    req = {
      body: {
        username: 'anyuser',
        password: '01234567',
      },
    };
    await createSession(req, res);
    expect(res.statusCode).toBe(401);
    expect(res._getJSONData()).toEqual({ error: 'wrong username or password' });
  });
  it('should wrong email or password(wrong user)', async () => {
    await db.query(
      'INSERT INTO users (name, username, password, role_id, create_at, update_at) VALUES ($1 , $2, $3, $4, NOW(), NOW()) RETURNING id, name, username, role_id;',
      ['Any F User', 'anyuser', '01234567', '3'],
    );
    req = {
      body: {
        username: 'anyusef',
        password: '01234567',
      },
    };
    await createSession(req, res);
    expect(res.statusCode).toBe(401);
    expect(res._getJSONData()).toEqual({ error: 'wrong username or password' });
  });
  it('should wrong email or password(wrong password)', async () => {
    await db.query(
      'INSERT INTO users (name, username, password, role_id, create_at, update_at) VALUES ($1 , $2, $3, $4, NOW(), NOW()) RETURNING id, name, username, role_id;',
      ['Any F User', 'anyuser', '01234567', '3'],
    );
    req = {
      body: {
        username: 'anyuser2',
        password: '01234568',
      },
    };
    await createSession(req, res);
    expect(res.statusCode).toBe(401);
    expect(res._getJSONData()).toEqual({ error: 'wrong username or password' });
  });
  it('should return token', async () => {
    password_hash = await bcrypt.hash('01234567', 10);
    await db.query(
      'INSERT INTO users (name, username, password, role_id, create_at, update_at) VALUES ($1 , $2, $3, $4, NOW(), NOW()) RETURNING id, name, username, role_id;',
      ['Any F User', 'anyuser', password_hash, '3'],
    );
    req = {
      body: {
        username: 'anyuser',
        password: '01234567',
      },
    };
    await createSession(req, res);
    expect(res.statusCode).toBe(201);
    expect(res._getJSONData()).toEqual({
      token: res._getJSONData().token,
      user: {
        create_at: res._getJSONData().user.create_at,
        id: 1,
        name: 'Any F User',
        role_id: 3,
        role_name: 'waiter',
        update_at: res._getJSONData().user.update_at,
        username: 'anyuser',
      },
    });
  });
});
