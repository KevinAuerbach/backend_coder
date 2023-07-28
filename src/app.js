import express from 'express'
import productsRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'

const puerto = 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use("/api/products", productsRouter)
app.use("/api/cart", cartRouter)



app.listen(puerto, () => {
    console.log(`Server listening on PORT:${puerto}`)
})



