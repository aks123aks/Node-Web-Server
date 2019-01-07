const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

let app = express();

hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs');

app.use((request, response, next) => {
    let now = new Date().toString();
    let log = `${now}: ${request.method} ${request.url}`;
    
    console.log(log);
    fs.appendFile('server.log', log + '\n', (error) => {
        if(error){
            console.log('Unable to append.');
        }
    });
    next();
});

/*app.use((request, response, next) => {
    response.render('maintenance.hbs');
});*/

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (request, response) => {
    //response.send('<h1>Hello Express!<h1>');
    response.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website.',
    });
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        pageTitle: 'About Page',
    })
});

app.get('/projects', (request, response) => {
    response.render('projects.hbs', {
        pageTitle: 'Projects',
    });
})

app.get('/bad', (request, response) => {
    response.send({
        errorMessage: 'Unable to handle request'
    });
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});