CREATE DATABASE sell_db;

CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  role_name VARCHAR (255) UNIQUE NOT NULL,
  description VARCHAR (255)
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  username VARCHAR(25) UNIQUE NOT NULL,
  password VARCHAR (255) NOT NULL,
  role_id INT NOT NULL,
  create_at TIMESTAMP NOT NULL,
  update_at TIMESTAMP NOT NULL,
  FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR (255) UNIQUE NOT NULL,
  description VARCHAR (255),
  create_at TIMESTAMP NOT NULL,
  update_at TIMESTAMP NOT NULL,
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description VARCHAR (255),
  category_id INT NOT NULL,
  price FLOAT(2) NOT NULL,
  create_at TIMESTAMP NOT NULL,
  update_at TIMESTAMP NOT NULL,
  FOREIGN KEY (category_id) REFERENCES category (id)
);

