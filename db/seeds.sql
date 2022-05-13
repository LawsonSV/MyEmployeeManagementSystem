USE employee_db

INSERT INTO departments (department_name)
VALUES
    ("Sales/Finance"),
    ("Human Resources"),
    ("Research and Development");

INSERT INTO roles (title, salary, department_id)
VALUES
('CEO', 1000000, 1),
('HR Manager', 90000, 2),mys
('Front End Developer', 5000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Bruce', 'Randolph', 1, NULL),
('Kelcie', 'Smithers', 2, NULL),
('Melvin', 'McBride', 3, NULL);