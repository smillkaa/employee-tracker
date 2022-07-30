USE company;

INSERT INTO departments
(department)
VALUES
('Engineering'),
('Finance'),
('Legal'),
('Sales');

INSERT INTO roles
(title, salary, department_id)
VALUES
('Software Engineer', 100000.00, 1),
('Accountant', 200000.00, 2),
('Attorney', 150000.00, 3),
('Sales Rep', 80000.00, 4),
('Lead Software Engineer', 400000.00, 1),
('VP', 1000000.00, 2);

INSERT INTO employees
(first_name, last_name, role_id, manager_id)
VALUES
('Ken', 'Smith', 5, NULL),
('Laura', 'Lilly', 1, 1),
('Diana', 'Rose', 5, NULL),
('John', 'Johnson', 2, 3),
('Ana', 'Carillo', 2, 3),
('David', 'Feliz', 1, 1);