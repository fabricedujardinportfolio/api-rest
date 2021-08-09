const express = require('express');
const faker = require('faker');
const bodyParser = require('body-parser');
const app = express();

// Liste des livres
const books = [];

for(let i = 0; i < 100; i++) {
    books.push ({
        title: faker.name.title(),
        author: faker.name.lastName(),
        description: faker.lorem.paragraph()
    })
}

// Creer la version de notre api
const versionApi = '/api/v1';

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

//GET /api/v1/books
app.get(`${versionApi}/books`, (req, res) => {

    res.json({
        data: books
    })

});


//GET /api/v1/books/:id
app.get(`${versionApi}/books/:id`, (req, res) => {

    const id = req.params.id - 1;

    res.json({
        data: books[id] || null
    })

});

// POST /api/v1/books
app.post(`${versionApi}/books`, (req, res) => {

    const data = req.body;

    books.push(data);

    res.json({
        index : books.length,
        data: books[books.length-1]
    })

});

// PUT /api/v1/books/:id
app.put(`${versionApi}/books/:id`, (req, res) => {

    const id = req.params.id - 1;
    const data = req.body;

    books[id] = Object.assign(books[id], data);

    res.json({
        data: books[id]
    })

});

// DELETE /api/v1/books/:id
app.delete(`${versionApi}/books/:id`, (req, res) => {

    const id = req.params.id - 1;

    books.splice(id, 1);

    console.log(books.length);

    res.sendStatus(200);

});

app.listen(3000, () => console.log('Listening on port 3000'));