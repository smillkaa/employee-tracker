const inquirer = require('inquirer')
const { viewDepts } = require('./db')
require("console.table")
const db = require('./db')
  

function questions() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'view_add',
            message: 'What would you like to do?',
            choices: [
                {
                    name: 'View all departments',
                    value: 'VIEW_DEPARTMENTS'
                },
                {
                    name: 'View all roles',
                    value: 'VIEW_ROLES'
                },
                {
                    name: 'View all employees',
                    value: 'VIEW_EMPLOYEES'
                },
                {
                    name: 'Add a department',
                    value: 'ADD_DEPARTMENT'
                },
                {
                    name: 'Add a role',
                    value: 'ADD_ROLE'
                },
                {
                    name: 'Add an employee',
                    value: 'ADD_EMPLOYEE'
                },
                {
                    name: 'Update an employee role',
                    value: 'UPDATE_EMPLOYEE'
                }
            ]
        }
    ])
    .then(answer => {

       switch(answer.view_add) {

        case 'VIEW_DEPARTMENTS':
            db.viewDepts()
            .then(([rows]) => {
                let departments = rows
                console.log('\n')
                console.table(departments)
            })
            .then(() => questions())
           break

        case 'VIEW_ROLES':
            db.viewRoles()
            .then(([rows]) => {
                let roles = rows
                console.log('\n')
                console.table(roles)
            })
            .then(() => questions())
            break

        case 'VIEW_EMPLOYEES':
            db.viewEmployees()
            .then(([rows]) => {
                let employees = rows
                console.log('\n')
                console.table(employees)
            })
            .then(() => questions())
            break

        case 'ADD_DEPARTMENT':
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'deptInput',
                    message: 'What is the department name?'
                }
            ])
            .then(answer => {
                let department = answer.deptInput
                db.addDept(department)
                db.viewDepts()
                .then(([rows]) => {
                    let departments = rows
                    console.log('\n')
                    console.table(departments)
                })
            })
            .then(() => questions())
            break

        case 'ADD_ROLE':
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'roleInput',
                    message: 'What is the role name?'
                },
                {
                    type: 'input',
                    name: 'roleSalaryInput',
                    message: "What is the role's salary?"
                },
                {
                    type: 'input',
                    name: 'deptInput'
                }
            ])
            db.addRole()
            .then(([rows]) => {
                console.log('\n')
                
            })
            .then(() => questions())
            break

        case 'ADD_EMPLOYEE':
            db.addEmployee()
            .then(([rows]) => {
                let employee = rows
                console.log('\n')
                console.table(employee)
            })
            .then(() => questions())
            break

        case 'UPDATE_EMPLOYEE':
           db.updateRole()
           .then(([rows]) => {
            let role = rows
            console.log('\n')
            console.table(role)
        })
        .then(() => questions())
            break

        default:
            process.exit()
       }
    })
}

function init() {
    questions()
}
init()