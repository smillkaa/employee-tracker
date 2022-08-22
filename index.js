const inquirer = require('inquirer')
require("console.table")
const db = require('./db')
const DB = require('./db/index')
  

// function to return an array of departments
function arrayOfDepts() {
    let array = []
    DB.viewDepts().then(res => {
        let resArray = res[0] // all depts as an array of objects
        resArray.forEach((i) => {
           array.push(i.department)
        })
    })
    return array
}

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
                console.log('\n')
                console.table(rows)
            })
            .then(() => init())
           break

        case 'VIEW_ROLES':
            db.viewRoles()
            .then(([rows]) => {
                console.log('\n')
                console.table(rows)
            })
            .then(() => init())
            break

        case 'VIEW_EMPLOYEES':
            db.viewEmployees()
            .then(([rows]) => {
                console.log('\n')
                console.table(rows)
            })
            .then(() => init())
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
                    console.log('\n')
                    console.table(rows)
                })
            })
            .then(() => init())
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
                    // i need the query for view depts for each row to be an item in the array. so the query result has to be an array of rows. 
                    type: 'list',
                    name: 'deptInput',
                    message: 'Which department does the role belong to?',
                    choices: arrayOfDepts()
                }
            ])
            .then(answer => {
                let role = []
                role.push(answer.roleInput, answer.roleSalaryInput, answer.deptInput)
                db.addRole(role)
                db.viewRoles()
                .then(([rows]) => {
                    let roles = rows
                    console.log('\n')
                    console.table(roles)
                })
            })
            // .then(() => questions())
            break

        case 'ADD_EMPLOYEE':
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstNameInput',
                    message: "What is the employee's first name?"
                },
                {
                    type: 'input',
                    name: 'lastNameInput',
                    message: "What is the employee's last name?"
                },
                {
                    type: 'input',
                    name: 'emplRoleInput',
                    message: "What is the employee's role?"
                },
                {
                    type: 'input',
                    name: 'managerInput',
                    message: "Who's the employee's manager?"
                }
            ])
            .then(answer => {
                let employee = `"${answer.firstNameInput}" + ',' + "${answer.lastNameInput}" + ',' + "${answer.emplRoleInput}" + ',' + "${answer.managerInput}"`
                db.addEmployee(employee)
                db.viewEmployees()
                .then(([rows]) => {
                    let employees = rows
                    console.log('\n')
                    console.table(employees)
                })
                .then(() => init())
            })
            break

        case 'UPDATE_EMPLOYEE':
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstNameInputUpd',
                    message: "What is the employee's first name?"
                },
                {
                    type: 'input',
                    name: 'lastNameInputUpd',
                    message: "What is the employee's last name?"
                },
                {
                    type: 'list',
                    name: 'emplRoleInputUpd',
                    message: "What is the employee's new role?",
                    choices: depts
                }
            ])
            .then(answer => {
                let employee = `"${answer.firstNameInputUpd}" + ',' + "${answer.lastNameInputUpd}" + ',' + "${answer.emplRoleInputUpd}"`
                db.updateRole(employee)
                .then(([rows]) => {
                    let role = rows
                    console.log('\n')
                    console.table(role)
                })
            })
            .then(() => init())
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