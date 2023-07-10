class ProductManager {
    constructor() {
        this.products = []
        }

    addProduct (title, description, price, thumbnail, code, stock) {
        let max = 0
        this.products.forEach((product) => {
            product.id > max ? product.id : max 
        })
        let id = max + 1

        const newProduct = {id, title, description, price, thumbnail, code, stock}
        let productFound = this.products.find((product) => product.code === code)
        if(productFound) {
            console.log("A product with that code already exists")
        }else {
            this.products.push(newProduct) 
            console.log("Product added!")  
        }       
    }
    
    getProducts () {
         console.log(this.products)
    }

    getProductById (id) {
        let idFound = this.products.find((product) => product.id == id)
        
        if(idFound) {
            console.log({msg: "Product Found!", data: idFound})
        }else {
            console.log("Product not found!")
        }
    }
}


    let kevin = new ProductManager
    kevin.getProducts()
    kevin.addProduct("producto prueba", "este es un producto prueba", 200, "sin imagen", "abc123", 25)
    kevin.getProducts()
    kevin.addProduct("producto prueba", "este es un producto prueba", 200, "sin imagen", "abc123", 25)
    kevin.getProductById(1)
    kevin.getProductById(4)
    