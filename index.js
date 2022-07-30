const inquirer = require('inquirer')
require('console.table')
const connection = require('./db/connection')
  

async function questions() {
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
           viewDepts();
           break;

        case 'VIEW_ROLES':
            viewRoles()
            break

        case 'VIEW_EMPLOYEES':
            viewEmployees()
            break

        case 'ADD_DEPARTMENT':
            addDept()
            break

        case 'ADD_ROLE':
            addRole()
            break

        case 'ADD_EMPLOYEE':
            addEmployee()
            break

        case 'UPDATE_EMPLOYEE':
           updateRole()
            break

        default:
            process.exit()
       }
    })
}

// functions to display database info based on user answer
function viewDepts() {
    console.log('1st')
}
function viewRoles() {
    console.log('2nd')
}
function viewEmployees() {
    console.log('3rd')
}
function addDept() {
    console.log('4th')
}
function addRole() {
    console.log('5th')
}
function addEmployee() {
    console.log('6th')
}
function updateRole() {
    console.log('7th')
}

function init() {
    questions()
}
init()