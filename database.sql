CREATE DATABASE sell_db;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  username VARCHAR(25) UNIQUE NOT NULL,
  create_at TIMESTAMP NOT NULL 
);

CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  role_name VARCHAR (255) UNIQUE NOT NULL 
);

CREATE TABLE user_roles (
  user_id INT NOT NULL,
  role_id INT NOT NULL,
  PRIMARY KEY (user_id, role_id),
  FOREIGN KEY (role_id) REFERENCES roles (id),
  FOREIGN KEY (user_id) REFERENCES users (id)
);