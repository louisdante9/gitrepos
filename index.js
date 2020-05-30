const axios = require('axios');
const inquirer = require('inquirer');

const getUsername = () => {
    return inquirer.prompt({
        name: 'username',
        type: 'input',
        message: 'Enter a github username:',
        validate: function (value) {
            if (value.length) {
                return true;
            } else {
                return 'Please enter github username.';
            }
        }
    })
}

const getRepos = async() => {
    const credentials = await getUsername();
    axios.get(`https://api.github.com/users/${credentials.username}/repos?per_page=5`)
    .then(({data} )=> {
         const repos = data.map((repo)=> repo.full_name);
         return console.log(repos);
    })
    .catch(err => console.log(err))
}

getRepos()