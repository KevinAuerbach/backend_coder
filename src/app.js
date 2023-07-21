import express from 'express'
import { ProductManager } from './productManager.js'

const puerto = 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/products", async (req, res) => {
    let limits = req.query.limits
    let products = await pm.getProducts()
    if(limits) {
        let filterProducts = products.slice(0, limits)
        res.status(200).send(filterProducts)
    } else {
        res.status(200).send(products)
    }
})

app.get("/products/:pid", async (req, res) => {
    let pid = req.params.pid
    res.status(200).send(await pm.getProductById(pid))
})


app.listen(puerto, () => {
    console.log(`Server listening on PORT:${puerto}`)
})

const pm = new ProductManager("products.json")

