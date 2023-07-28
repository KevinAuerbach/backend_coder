import router from 'express'
import { ProductManager } from '../productManager.js'

const pm = new ProductManager("../products.json")
const productsRouter = router()

productsRouter.get("/api/products", async (req, res) => {
    let limits = req.query.limits
    let products = await pm.getProducts()
    if(limits) {
        let filterProducts = products.slice(0, limits)
        res.status(200).send(filterProducts)
    } else {
        res.status(200).send(products)
    }
})

productsRouter.get("/api/products/:pid", async (req, res) => {
    let pid = req.params.pid
    res.status(200).send(await pm.getProductById(pid))
})



export default productsRouter