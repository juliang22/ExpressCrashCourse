const Express = require("express")
const app = Express()
const Path = require('path')
const exphbs = require('express-handlebars')
const PORT = process.env.PORT || 3000 // When we are out of development, we don't want this hardcoded and will most likely have our server on an environment variable in process so we check that first
const members = require('./members')

// Example of custom middleware
//? const logger = require('./middleware/logger')
//initalizes middleware
//? app.use(logger)

// Body Parse Middleware
app.use(Express.json()) //handles posting raw json
app.use(Express.urlencoded({ extended: false })) // handles form submissions/url encoded data

// Handlebars Middleware boilerplate 
app.engine('handlebars', exphbs({ defaultLayout: 'main' })) // setting view/template engine to handlebars and passing in exphbs and setting default layout to a filename called main
app.set('view engine', 'handlebars') //setting view engine

// Homepage route, different way other than the static rendering down below (usually you wouldn't do this, but this crashcourse is showing 2 diff methods)
app.get('/', (req, res) => res.render('index', {
	title: 'Member App', //passing data, second param can be an object
	members
}))

// Loading html files manually, not ideal becasue you would have to do this for every single route on the page
// Express comes with functionality to create static servers (just having non-dynamic html/css). 
//? app.get("/", (req, res) => {
//? 	res.sendFile(Path.join(__dirname, 'public', 'index.html'))
//? })

// Static folder
app.use(Express.static(Path.join(__dirname, 'public'))) //sets public to static folder, works the same as above but you can have multiple routes

// when /api/members endpoint is hit, the require function is called which returns a router which uses /api/members and whatever other endpoints after that and routes it. Go to members.js for the router
app.use('/api/members', require('./routes/api/members'))

// Start a server listening on a specific port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
