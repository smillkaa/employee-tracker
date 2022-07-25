const inquirer = require('inquirer')
const router = require('./routes/apiRoutes/departmentRoutes')


const questions = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'view_add',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role'
            ]
        }
    ])
    .then((answer) => {

       switch(answer.view_add) {

        case 'View all departments':
           viewDepts()
           break

        case 'View all roles':
            viewRoles()
            break

        case 'View all employees':
            viewEmployees()
            break

        case 'Add a department':
            addDept()
            break

        case 'Add a role':
            addRole()
            break

        case 'Add an employee':
            addEmployee()
            break

        case 'Update an employee role':
           updateRole()
            break

        default:
            process.exit()
       }
    })
}

questions()

// functions to display database info based on user answer
viewDepts = () => {
    console.table('department')
}

viewRoles = () => {
    console.log(router)
}
