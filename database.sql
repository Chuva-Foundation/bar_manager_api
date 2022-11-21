CREATE DATABASE sell_db;

CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  role_name VARCHAR (255) UNIQUE NOT NULL,
  description VARCHAR (255)
);

INSERT INTO roles (role_name) VALUES (admin), (doorman), (waiter), (cashier);

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

CREATE TABLE cards (
  id UUID PRIMARY KEY,
  active BOOLEAN NOT NULL DEFAULT false,
  create_at TIMESTAMP NOT NULL,
  update_at TIMESTAMP NOT NULL
);

CREATE TABLE bills (
  id SERIAL PRIMARY KEY,
  paid_out BOOLEAN NOT NULL DEFAULT false,
  card_id UUID UNIQUE,
  create_at TIMESTAMP NOT NULL,
  update_at TIMESTAMP NOT NULL,
  FOREIGN KEY (card_id) REFERENCES cards (id)
)

CREATE TABLE sales (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  amount INT NOT NULL CHECK (amount >= 1),
  price FLOAT(2) NOT NULL,
  seller INT NOT NULL,
  bill_id INT NOT NULL,
  create_at TIMESTAMP NOT NULL,
  update_at TIMESTAMP NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products (id),
  FOREIGN KEY (seller) REFERENCES users (id),
  FOREIGN KEY (bill_id) REFERENCES bills (id)
)