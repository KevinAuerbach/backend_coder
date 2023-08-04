import express from 'express'
import productManager from '../productManager.js'

const pm = new productManager()
const viewsRouter = express.Router()

viewsRouter.get('/', (req, res) => {
    const products = pm.getProducts()
    res.render('home', products)
})

viewsRouter.get('/realtimeproducts', (req, res) => {

})

export default viewsRouter