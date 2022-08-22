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
            let id = i.id
            let dept = i.department
            let data = id + " " + dept
           array.push(data)
        })
    })
    return array
    
}

// function to return an array of roles
function arrayOfRoles() {
    let array = []
    DB.viewRoles().then(res => {
        let resArray = res[0]
        resArray.forEach((i) => {
            let id = i.id
            let title = i.title
            let data = id + " " + title
           array.push(data)
        })
    })
    return array
}

//function to return an array of managers
function arrayOfManagers() {
    
    let array = []
    DB.viewEmployees().then(res => {
        let resArray = res[0]
        resArray.forEach((i) => {
            let name = i.first_name
            let data = i.manager + " " + name

           if (i.manager === 'Ken Smith') {
            array.push(data)
           }
        })
        console.log(JSON.stringify(res[0]))
    })
    // return array
}
arrayOfManagers()

// function questions() {
//     inquirer.prompt([
//         {
//             type: 'list',
//             name: 'view_add',
//             message: 'What would you like to do?',
//             choices: [
//                 {
//                     name: 'View all departments',
//                     value: 'VIEW_DEPARTMENTS'
//                 },
//                 {
//                     name: 'View all roles',
//                     value: 'VIEW_ROLES'
//                 },
//                 {
//                     name: 'View all employees',
//                     value: 'VIEW_EMPLOYEES'
//                 },
//                 {
//                     name: 'Add a department',
//                     value: 'ADD_DEPARTMENT'
//                 },
//                 {
//                     name: 'Add a role',
//                     value: 'ADD_ROLE'
//                 },
//                 {
//                     name: 'Add an employee',
//                     value: 'ADD_EMPLOYEE'
//                 },
//                 {
//                     name: 'Update an employee role',
//                     value: 'UPDATE_EMPLOYEE'
//                 }
//             ]
//         }
//     ])
//     .then(answer => {

//        switch(answer.view_add) {

//         case 'VIEW_DEPARTMENTS':
//             db.viewDepts()
//             .then(([rows]) => {
//                 console.log('\n')
//                 console.table(rows)
//             })
//             .then(() => init())
//            break

//         case 'VIEW_ROLES':
//             db.viewRoles()
//             .then(([rows]) => {
//                 console.log('\n')
//                 console.table(rows)
//             })
//             .then(() => init())
//             break

//         case 'VIEW_EMPLOYEES':
//             db.viewEmployees()
//             .then(([rows]) => {
//                 console.log('\n')
//                 console.table(rows)
//             })
//             .then(() => init())
//             break

//         case 'ADD_DEPARTMENT':
//             inquirer.prompt([
//                 {
//                     type: 'input',
//                     name: 'deptInput',
//                     message: 'What is the department name?'
//                 }
//             ])
//             .then(answer => {
//                 let department = answer.deptInput
//                 db.addDept(department)
//                 db.viewDepts()
//                 .then(([rows]) => {
//                     console.log('\n')
//                     console.table(rows)
//                 })
//             })
//             .then(() => init())
//             break

//         case 'ADD_ROLE':
            
//             inquirer.prompt([
//                 {
//                     type: 'input',
//                     name: 'roleInput',
//                     message: 'What is the role name?'
//                 },
//                 {
//                     type: 'input',
//                     name: 'roleSalaryInput',
//                     message: "What is the role's salary?"
//                 },
//                 {
                   
//                     type: 'list',
//                     name: 'deptInput',
//                     message: 'Which department does the role belong to?',
//                     choices: arrayOfDepts()
//                 }
//             ])
//             .then(answer => {
//                 let role = []
//                 let deptID = answer.deptInput.match(/\d+/) //extracts the id number from the answer
//                 role.push(answer.roleInput, answer.roleSalaryInput, deptID)
//                 db.addRole(role)
//                 db.viewRoles()
//                 .then(([rows]) => {
//                     let roles = rows
//                     console.log('\n')
//                     console.table(roles)
//                 })
//             })
//             .then(() => questions())
//             break

//         case 'ADD_EMPLOYEE':
//             inquirer.prompt([
//                 {
//                     type: 'input',
//                     name: 'firstNameInput',
//                     message: "What is the employee's first name?"
//                 },
//                 {
//                     type: 'input',
//                     name: 'lastNameInput',
//                     message: "What is the employee's last name?"
//                 },
//                 {
//                     type: 'list',
//                     name: 'emplRoleInput',
//                     choices: arrayOfRoles()
//                 },
//                 {
//                     type: 'list',
//                     name: 'managerInput',
//                     message: arrayOfManagers()
//                 }
//             ])
//             .then(answer => {
//                 let employee = `"${answer.firstNameInput}" + ',' + "${answer.lastNameInput}" + ',' + "${answer.emplRoleInput}" + ',' + "${answer.managerInput}"`
//                 db.addEmployee(employee)
//                 db.viewEmployees()
//                 .then(([rows]) => {
//                     let employees = rows
//                     console.log('\n')
//                     console.table(employees)
//                 })
//                 .then(() => init())
//             })
//             break

//         case 'UPDATE_EMPLOYEE':
//             inquirer.prompt([
//                 {
//                     type: 'input',
//                     name: 'firstNameInputUpd',
//                     message: "What is the employee's first name?"
//                 },
//                 {
//                     type: 'input',
//                     name: 'lastNameInputUpd',
//                     message: "What is the employee's last name?"
//                 },
//                 {
//                     type: 'list',
//                     name: 'emplRoleInputUpd',
//                     message: "What is the employee's new role?",
//                     choices: depts
//                 }
//             ])
//             .then(answer => {
//                 let employee = `"${answer.firstNameInputUpd}" + ',' + "${answer.lastNameInputUpd}" + ',' + "${answer.emplRoleInputUpd}"`
//                 db.updateRole(employee)
//                 .then(([rows]) => {
//                     let role = rows
//                     console.log('\n')
//                     console.table(role)
//                 })
//             })
//             .then(() => init())
//             break

//             default:
//             process.exit()
//        }
//     })
// }

// function init() {
//     questions()
// }
// init()