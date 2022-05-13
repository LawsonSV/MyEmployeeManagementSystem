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
    .then(({selection}) => {
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
    db.query('SELECT * FROM department;',function(err,response){
        
      if(err) throw err;
      console.table(response)
      selectPrompt()
    })
  }

  function viewDepartment() {
    db.query('SELECT * FROM department;',function(err,response){
        
      if(err) throw err;
      console.table(response)
      selectPrompt()
    })
  }