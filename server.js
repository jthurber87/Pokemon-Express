const express = require('express');
const pokemon = require('./models/pokemon');
const methodOverride = require('method-override');
const app = express()
const port = 3000

//MIDDLEWARE
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'))

// Index route
app.get('/', (req, res) => {
    res.redirect("/pokemon")
})

app.get('/pokemon', (req, res) => {
    res.render('index.ejs', {
        allPokemon: pokemon
    })
})

// New route
app.get('/pokemon/new', (req, res) => {
  res.render('new.ejs')
})

// Post route
app.post('/pokemon', (req, res) => {
  pokemon.push(req.body)
  res.redirect('/pokemon')
})

// Show route
app.get('/pokemon/:id', (req, res) => {
    res.render('show.ejs', {
        pokemon: pokemon[req.params.id],
        index: req.params.id
    })
})

// Delete route
app.delete('/pokemon/:id', (req, res) => {
    pokemon.splice(req.params.id, 1)
    res.redirect('/pokemon')
})

// Edit route
app.get('/pokemon/:id/edit', (req, res) => {
  res.render('edit.ejs', {
    pokemon: pokemon[req.params.id],
    index: req.params.id
  })
})

// Put route
app.put('/pokemon/:id', (req, res) => {
	pokemon[req.params.id] = req.body //in our fruits array, find the index that is specified in the url (:index).  Set that element to the value of req.body (the input data)
	res.redirect('/pokemon'); //redirect to the index page
})

app.listen(port, () => {
    console.log("App listening on port " + port)
})
