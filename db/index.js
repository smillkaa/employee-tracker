const connection = require('./connection')

class DB {
    constructor(connection) {
        this.connection = connection
    }
    // Find all employees, join with roles and departments to display their roles, salaries, departments, and managers
    findAllEmployees() {
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        )
    }

    createEmployee(employee) {
        return this.connection.promise().query("INSERT INTO employee SET ?", employee);
    }

    // View all departments
    viewAllDepts() {
        return this.connection.promise().query(
            "SELECT * FROM departments;"
        )
    }
    // View all roles: job title, role id, the department that role belongs to, and the salary for that role (need to join dept id to dept table)
    viewAllRoles() {
        return this.connection.promise().query(
            "SELECT roles.id, roles.title, roles.salary, departments.department FROM roles LEFT JOIN departments ON roles.department_id = departments.id;"
        )
    }
}

module.exports = new DB(connection)