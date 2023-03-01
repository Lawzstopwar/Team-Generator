const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs/promises");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.



let team = [];

async function createManager () {
    const answers = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the manager's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the manager's id?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the manager's email?"
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is the manager's office number?"
        }
    ])

    const newManager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber)
    team.push(newManager);
    mainMenu()
}

async function createIntern () {
    const answers = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the intern's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the intern's id?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the intern's email?"
        },
        {
            type: "input",
            name: "school",
            message: "What is the intern's school?"
        }
    ])

    const newIntern = new Intern(answers.name, answers.id, answers.email, answers.school)
    team.push(newIntern);
    mainMenu()
}

async function createEngineer () {
    const answers = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the engineer's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the engineer's id?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the engineer's email?"
        },
        {
            type: "input",
            name: "github",
            message: "What is the engineer's github?"
        }
    ])

    const newEngineer = new Engineer(answers.name, answers.id, answers.email, answers.github)
    team.push(newEngineer);
    mainMenu()
}

async function mainMenu () {
    const answers = await inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: [
                "Add Engineer",
                "Add Intern",
                "Finish adding and build HTML"
            ]
        }
    ])

    if(answers.action == "Finish adding and build HTML") {
        buildHTML();
    }

    if(answers.action == "Add Engineer") {
        createEngineer();
    }

    if(answers.action == "Add Intern") {
        createIntern();
    }
}

async function buildHTML () {
    let htmlDoc = render(team)
    await fs.writeFile(outputPath, htmlDoc)
}

createManager()

// startProgram()
// async function startProgram(){

//     team.push(new Employee("James", 1, "test@test.com", 3985))



//     let htmlDoc = render(team)


//     await fs.writeFile(outputPath, htmlDoc)
// }
