const inquirer = require('inquirer')
const mysql2 = require('mysql2')
require("console.table")

const db = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "CocktailPeanuts520!",
    database: "employee_db",
});

db.connect(() => {
    console.log("connected to database")
    selectPrompt()
})

function selectPrompt() {
    inquirer.prompt([
        {
            type: 'list',
            name: "selection",
            message: 'What would you like to do?',
            choices: ["Add Department", "Add Employee", "Add Role",
                "View Departments", "View Role", "View Employees", "Exit"]
        }
    ])
        .then(({ selection }) => {
            switch (selection) {
                case "Add Department":
                    addDepartment();
                    break
                case "Add Employee":
                    addEmployee();
                    break
                case "Add Role":
                    addRole();
                    break
                case "View Departments":
                    viewDepartment();
                    break
                case "View Role":
                    viewRole();
                    break
                case "View Employees":
                    viewEmployees();
                    break;
                default:
                    db.end();
                    process.exit(0);
            }
        })
}

function viewDepartment() {
    db.query('SELECT * FROM departments;',
        function (err, response) {
            if (err) throw err;
            console.table(response)
            selectPrompt()
        })
}

function viewRole() {
    db.query('SELECT * FROM roles;',
        function (err, response) {
            if (err) throw err;
            console.table(response)
            selectPrompt()
        })
}

function viewEmployees() {
    db.query('SELECT * FROM employees;',
        function (err, response) {
            if (err) throw err;
            console.table(response)
            selectPrompt()
        })
}

function addDepartment() {
    inquirer.prompt([{
        type: 'input',
        name: 'departmentName',
        message: 'Enter department name.',
    }]).then(({ departmentName }) => {
        db.query('INSERT INTO departments (department_name) VALUES(?);', departmentName, function (err, response) {
            if (err) throw err;
            console.table(response)
            selectPrompt()
        })
    })
}

function addRole() {
    inquirer.prompt([{
        type: 'input',
        name: 'roleTitle',
        message: 'Enter Role title.'
    },
    {
        type: 'input',
        name: 'roleSalary',
        message: 'Enter Role salary.'
    },
    {
        type: 'input',
        name: 'roleDepartmentID',
        message: "Enter role's department ID."
    }
    ]).then(response => {
        db.query('INSERT INTO roles (' + 'title, ' + 'salary, ' + 'department_id) VALUES (?) ', response.roleTitle, response.roleSalary, response.roleDepartmentID, function (err, response) {
            if (err) throw err;
            console.table(response)
        })
        // db.query('INSERT INTO roles (salary) VALUES(?);', roleSalary, function (err, response) {
        //     if (err) throw err;
        //     console.table(response)
        // })
        // db.query('INSERT INTO roles (department_id) VALUES(?);', roleDepartmentID, function (err, response) {
        //     if (err) throw err;
        //     console.table(response)
        // })
    });
    // inquirer.prompt([{
    //     type: 'input',
    //     name: 'roleSalary',
    //     message: 'Enter Role salary.',
    //   }]).then(({roleSalary}) =>{
    //     db.query('INSERT INTO roles (salary) VALUES(?);', roleSalary, function(err,response){
    //       if(err) throw err;
    //       console.table(response)
    //     })
    //   })
    //   inquirer.prompt([{
    //     type: 'input',
    //     name: 'roleDepartmentID',
    //     message: "Enter Role's department id.",
    //   }]).then(({roleTitle}) =>{
    //     db.query('INSERT INTO roles (department_id) VALUES(?);', roleDepartmentID, function(err,response){
    //       if(err) throw err;
    //       console.table(response)
    //       selectPrompt()
    //     })
    //   })
}