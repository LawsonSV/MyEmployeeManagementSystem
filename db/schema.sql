DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE departments(
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  department_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles(
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary INT DEFAULT 1,
  department_id INT NOT NULL DEFAULT 1
);

CREATE TABLE employees(
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULl,
    last_name VARCHAR(30) NOT NULl,
    role_id INT NOT NULL REFERENCES roles(department_id),
    manager_id INT REFERENCES employee(id) ON DELETE SET NULL
);