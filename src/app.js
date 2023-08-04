import express from 'express'
import productsRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import viewsRouter from './routes/views.router.js'

const puerto = 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use("/api/products/", productsRouter)
app.use("/api/cart/", cartRouter)

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use('/', viewsRouter)

app.use(express.static(__dirname + '/public'))



app.listen(puerto, () => {
    console.log(`Server listening on PORT:${puerto}`)
})





