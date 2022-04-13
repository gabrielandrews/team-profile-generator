const inquirer = require('inquirer');
const fs = require('fs');
const Intern = require('./lib/Intern');
const Engineer = require('./lib/Engineer');
const Manager = require('./lib/Manager');
const { rejects } = require('assert');


function startQuestions() {

    inquirer
        .prompt([
            {
                type: 'text',
                name: 'name',
                message: "What is the team manager's name? (Required)",
                
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log('Please enter the name of the team manager!');
                        return false;
                    }
                }
            },
            {
                type: 'text',
                name: 'id',
                message: "What is the team manager's id? (Required)",
                
                validate: idInput => {
                    if (idInput) {
                        return true;
                    } else {
                        console.log('Please enter the id of the team manager!');
                        return false;
                    }
                }
            },
            {
                type: 'text',
                name: 'email',
                message: "What is the team manager's email address? (Required)",
               
                validate: emailInput => {
                    if (emailInput) {
                        return true;
                    } else {
                        console.log('Please enter the email address of the team manager!');
                        return false;
                    }
                }
            },
            {
                type: 'text',
                name: 'officeNumber',
                message: "What is the team manager's office number? (Required)",
                
                validate: officeNumberInput => {
                    if (officeNumberInput) {
                        return true;
                    } else {
                        console.log('Please enter the office number of the team manager!');
                        return false;
                    }
                }
            }
        ])
        .then(info => {
            questionsAboutTeam(info)
        })
}


function questionsAboutTeam(team) {

    console.log(`
    =====================
    Add a New Team Member
    =====================
    `);

    
    if (!team.members) {
        team.members = []
    }


    inquirer
        .prompt([
            {
                type: 'list',
                name: 'memberType',
                message: 'Which type of team member would you like to add? Or would you like to stop adding members? (Required)',
                choices: ['Intern', 'Engineer', 'Finished adding']
            }
        ])
        .then(response => {
            

            if (response.memberType === 'Engineer') {
                questionsAboutEngineer(team)
            } 


            else if (response.memberType === 'Intern') {
                questionsAboutIntern(team)
            } 

            else {
                createObjects(team)
            }
        })   
}


function questionsAboutIntern(team) {

    
    if (!team.members.interns) {
        team.members.interns = []
    }

    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of the intern? (Required)',
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } 
                    else {
                        console.log('You need to enter a name for the intern!');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'id',
                message: 'What is the id of the intern? (Required)',
                validate: idInput => {
                    if (idInput) {
                        return true;
                    } 
                    else {
                        console.log('You need to enter an id for the intern!');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'email',
                message: 'What is the email address of the intern? (Required)',
                validate: emailInput => {
                    if (emailInput) {
                        return true;
                    } 
                    else {
                        console.log('You need to enter an email address for the intern!');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'school',
                message: 'What school does the intern attend? (Required)',
                validate: schoolInput => {
                    if (schoolInput) {
                        return true;
                    } 
                    else {
                        console.log("You need to enter the intern's school!");
                        return false;
                    }
                }
            },
            {
                type: 'confirm',
                name: 'confirmAddMember',
                message: 'Would you like to add another intern?',
                validate: confirmAnotherInterInput => {
                    if (confirmAnotherInternInput) {
                        return true;
                    } else {
                        console.log('Please confirm that you are done adding interns.')
                        return false;
                    }
                }
            }
        ])

        
        .then(newInternData => {
            team.members.interns.push(newInternData)

            if (newInternData.confirmAddMember) {
                questionsAboutIntern(team)
            } else {
                questionsAboutTeam(team)
            }
        })
}


function questionsAboutEngineer(team) {

    
    if (!team.members.engineers) {
        team.members.engineers = []
    }

    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of the engineer? (Required)',
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } 
                    else {
                        console.log('You need to enter a name for the intern!');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'id',
                message: 'What is the id of the engineer? (Required)',
                validate: idInput => {
                    if (idInput) {
                        return true;
                    } 
                    else {
                        console.log('You need to enter an id for the engineer!');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'email',
                message: 'What is the email address of the engineer? (Required)',
                validate: emailInput => {
                    if (emailInput) {
                        return true;
                    } 
                    else {
                        console.log('You need to enter an email address for the engineer!');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'github',
                message: 'What is the Github username of the engineer? (Required)',
                validate: githubInput => {
                    if (githubInput) {
                        return true;
                    } 
                    else {
                        console.log("You need to enter the engineer's github username!");
                        return false;
                    }
                }
            },
           {
                type: 'confirm',
                name: 'confirmAddMember',
                message: 'Would you like to add another engineer?',
                default: false
            }
        ])
        .then(newEngineerData => {
            team.members.engineers.push(newEngineerData)

            if (newEngineerData.confirmAddMember) {
                questionsAboutEngineer(team)
            } else {
                questionsAboutTeam(team)
            }
        })
}


function createObjects(team) {

    
    const manager = new Manager
        (
            team.name, 
            team.id, 
            team.email, 
            team.officeNumber
        );
    
    
    const engineerArray = []

   
    if (team.members.engineers) {

        
        for (i = 0; i < team.members.engineers.length; i++) {
            const engineer = new Engineer
                (
                    team.members.engineers[i].name, 
                    team.members.engineers[i].id,
                    team.members.engineers[i].email, 
                    team.members.engineers[i].github   
                )
        
            engineerArray.push(engineer)   
    }}

    
    const internArray = []

    
    if (team.members.interns) {

       
        for (i = 0; i < team.members.interns.length; i++) {
            const intern = new Intern
                (
                    team.members.interns[i].name, 
                    team.members.interns[i].id, 
                    team.members.interns[i].email, 
                    team.members.interns[i].school
                )

            internArray.push(intern)  
    }}   
   
   
    const template = generatePage(manager, engineerArray, internArray)

   
    if (template) {
        fs.writeFileSync('./dist/index.html', template, err => {
            if (err) {
                reject(err)
                return
            }

            resolve({
                ok: true, 
                message: 'Succesfully created team profile!'
            })
        })
        console.log("Html page was created! Please check the dist folder for the html document.")
    }
}


function generatePage(manager, engineers, interns) {
    return `
<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
        <script src="https://kit.fontawesome.com/be05b4af6b.js" crossorigin="anonymous"></script>
        <title>Team Profile Generator</title>
    </head>
    <body>
        <header class="d-flex flex-wrap justify-content-center bg-success">
            <h1>The Team:</h1>
        </header>
    
        <main>
            <div class="d-flex flex-wrap justify-content-center">
                ${generateManager(manager)}
            </div>
            <div class="d-flex flex-wrap justify-content-around">
                ${generateEngineer(engineers)}
                ${generateIntern(interns)}
            </div>
        </main>
    </body>
</html>`
}


function generateManager(manager) {

    return `
<div class="card">
    <div class="card-title bg-info">
        <div class="card-body">
            ${manager.name}
        </div>
        <div class="card-body">
            <i class="fas fa-mug-hot"></i>  ${manager.getRole()}
        </div>
    </div>
    <div class="card-body bg-secondary"> 
        <div class="card-body border-primary rounded"> 
            ID: ${manager.id}
        </div>
        <div class="card-body border-primary rounded"> 
            Email: <a href="mailto:${manager.email}">${manager.email}</a>
        </div>
        <div class="card-body border-primary rounded">
            Office Number: ${manager.officeNumber}
        </div>
    </div>
</div> 
`
}


function generateEngineer(engineers) {

  
    if (engineers.length > 0) {
        
        
        var storeEngineerHtml = ``

       
        engineers.forEach(engineer => {

            storeEngineerHtml += `
            <div class="card">
                <div class="card-title bg-info">
                    <div class="card-body">
                        ${engineer.name}
                    </div>
                    <div class="card-body">
                        <i class="fas fa-glasses"></i>  ${engineer.getRole()}
                    </div>
                </div>
                <div class="card-body bg-secondary"> 
                    <div class="card-body border-primary rounded"> 
                        ID: ${engineer.id}
                    </div>
                    <div class="card-body border-primary rounded"> 
                        Email: <a href="mailto:${engineer.email}">${engineer.email}</a>
                    </div>
                    <div class="card-body border-primary rounded">
                        GitHub: <a href="https://github.com/${engineer.github}" target="_blank">${engineer.github}</a>
                    </div>
                </div>
            </div> 
            `
        })
        return storeEngineerHtml;
    } 
    else {
        return ``;
    }
}


function generateIntern(interns) {

    
    if (interns.length > 0) {
    
        
        var storeInternHtml = ``

        interns.forEach(intern => {

            storeInternHtml += `
            <div class="card">
                <div class="card-title bg-info">
                    <div class="card-body">
                        ${intern.name}
                    </div>
                    <div class="card-body">
                        <i class="fas fa-user-graduate"></i>  ${intern.getRole()}
                    </div>
                </div>
                <div class="card-body bg-secondary"> 
                    <div class="card-body border-primary rounded"> 
                        ID: ${intern.id}
                    </div>
                    <div class="card-body border-primary rounded"> 
                        Email: <a href="mailto:${intern.email}">${intern.email}</a>
                    </div>
                    <div class="card-body border-primary rounded">
                        School: ${intern.school}
                    </div>
                </div>
            </div> 
            `
        })

    return storeInternHtml;

    } else {
        return ``;
    }
}

startQuestions();