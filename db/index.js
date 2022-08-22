const connection = require('../config/connection')

class DB {
    constructor(connection) {
        this.connection = connection
    }
    // view all departments and their id
    viewDepts() {
        return this.connection.promise().query(
            "SELECT * FROM departments;"
        )
    }

    // add department
    addDept(department) {
        return this.connection.promise().query("INSERT INTO departments (department) VALUES (?);", department)
    }

    // View all roles with their job title, role id, the department that role belongs to, and the salary for that role
    viewRoles() {
        return this.connection.promise().query(
            "SELECT roles.id, roles.title, roles.salary, departments.department FROM roles LEFT JOIN departments ON roles.department_id = departments.id;"
        )
    }

    // add a role
    addRole(role) {
        return this.connection.promise().query("INSERT INTO roles (title, salary, department_id) VALUES (?,?,?);", role)
    }

    // view all employees with their roles, salaries, departments, and managers
    viewEmployees(employee) {
        return this.connection.promise().query(
            "SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department AS departments, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employees LEFT JOIN roles on employees.role_id = roles.id LEFT JOIN departments on roles.department_id = departments.id LEFT JOIN employees manager on manager.id = employees.manager_id;", employee)
    }
    // add an empoyee
    addEmployee(employee) {
        return this.connection.promise().query("INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);", employee);
    }

    // update employee info
    updateEmployee(employee) {
        return this.connection.promise().query("UPDATE employees SET role_id = ? WHERE id = ?;")
    }
}

module.exports = new DB(connection)