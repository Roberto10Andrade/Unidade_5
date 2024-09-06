const express = require('express')
const app = express()
const conn = require('./db/conn')

const exphbs = require('express-handlebars')
const bodyParser = require('body-parser');
const router = express.Router();
const UserRouter = require('./router/userRouter')



//anexa a pasta templates
// const basePath = path.join(__dirname, 'templates')

//parser para leitura do body
app.use(bodyParser.urlencoded({ extended: true }));

//Config Session




// Configurando o Handlebars como motor de visualização

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')


const hbs = exphbs.create({
  partialsDir: ["views/partials"]
})



//Router2 users
app.use('/users', UserRouter)



app.get('/', (req, res) => {

  res.render(`login`)
})




conn
  //.sync({ force: true })
  .sync()
  .then(() => {
    app.listen(3000)
    console.log('Server Started')
  })
  .catch((err) => {
    console.log(err)
  })