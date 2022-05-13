const inquirer = require('inquirer')
const mysql2 = require('mysql2')

const db = mysql.createConnection({
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
    .then(({selection}) => {
        
    })
}