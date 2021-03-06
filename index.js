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
        const sql = 'INSERT INTO roles (title, salary, department_id) VALUES (?)';
        const values = [response.roleTitle, response.roleSalary, response.roleDepartmentID]
        db.query(sql, [values], function (err, response) {
            if (err) throw err;
            console.table(response);
            selectPrompt()
        })
    });
}

function addEmployee() {
    inquirer.prompt([{
        type: 'input',
        name: 'firstName',
        message: "Enter employee's first name."
    },
    {
        type: 'input',
        name: 'lastName',
        message: "Enter employee's last name."
    },
    {
        type: 'input',
        name: 'roleID',
        message: "Enter employee's role ID."
    },
    {
        type: 'input',
        name: 'managerID',
        message: "Enter the employee's manager ID."
    }
    ]).then(response => {
        const sql = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?)';
        const values = [response.firstName, response.lastName, response.roleID, response.managerID]
        db.query(sql, [values], function (err, response) {
            if (err) throw err;
            console.table(response);
            selectPrompt()
        })
    });
}