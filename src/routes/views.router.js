import { Router } from 'express'
import ProductManager from "../ProductManager.js";

const pm = new ProductManager()
const viewsRouter = Router()

viewsRouter.get('/', (req, res) => {
    const products = pm.getProducts()
    res.render('home', products)
})

viewsRouter.get("/realtimeproducts", (req, res) => {
    const products = pm.getProducts();
    res.render("realtimeProducts", { products });
  });
  
  viewsRouter.post("/products", (req, res) => {
    const newProduct = pm.addProduct(req.body);
    req.app.get("socketServer").emit("product_created", newProduct);
    res.json(newProduct);
  });
  
  viewsRouter.delete("/products/:id", (req, res) => {
    let id = Number(req.params.id);
    const deletedProduct = pm.deleteProduct(id);
    res.send({
      status: "ok",
      message: "El Producto se eliminó correctamente!",
    });
    req.app.get("socketServer").emit("product_deleted", deletedProduct);
    res.json(deletedProduct);
  });

export default viewsRouter