import fs from "fs"

export class ProductManager {
    constructor(path) {
        this.path = path
        this.products = []
        }

   

    async addProduct (title, description, price, thumbnail, code, stock) {
        try {
            let max = 0
            this.products.forEach((product) => {
                max = product.id > max && product.id
            })
            let id = max + 1
            if(!title||!description||!price||!thumbnail||!code||!stock) {
                console.log("Complete all fields!")
            } else {
                const newProduct = {id, title, description, price, thumbnail, code, stock}
                let productFound = this.products.find((product) => product.code === code)
                if(productFound) {
                    console.log("A product with that code already exists")
                }else {
                    this.products.push(newProduct) 
                    await fs.promises.writeFile(this.path, JSON.stringify(this.products))
            } 
            }
            
        }catch(error) {
            console.log(error)
        }      
    }
    
    async getProducts () {
        try {
            if (!fs.existsSync(this.path)) {
                await fs.promises.writeFile(this.path, JSON.stringify(this.products));
            } else {
                let data = await fs.promises.readFile(this.path, 'utf-8')
                if (data) {
                    this.products = JSON.parse(data)
                }
            }   
            console.log(this.products)
            return this.products 
        }
        catch(error) {
            console.log(error)
        }
    }

    async getProductById (id) {
        try {
            let data = await this.getProducts()
            let idFound = data.find((product) => product.id == id)
        
            if(idFound) {
                console.log({msg: "Product Found!", product: idFound})
                return idFound
            }else {
                console.log("Product not found!")
            }
        }
        catch(error) {
            console.log(error)
        }
    }

    async deleteProduct (id) {
        try {
            this.products = await this.getProducts()
            let pos = this.products.findIndex(product => product.id === id)

            if(pos > -1) {
                this.products.splice(pos, 1)
                await fs.promises.writeFile(this.path, JSON.stringify(this.products))
                console.log("Product deleted!")
            } else {
                console.log("Product not found!")
            }
        } 
        catch(error) {
            console.log(error)
        }
    }

    async updateProduct (id, title, description, price, thumbnail, code, stock) {
        try {
            this.products = await this.getProducts()
            let pos = this.products.findIndex(product => product.id === id)

            if(pos > -1) {
                this.products[pos].title = title
                this.products[pos].description = description
                this.products[pos].price = price
                this.products[pos].thumbnail = thumbnail
                this.products[pos].code = code
                this.products[pos].stock = stock
                await fs.promises.writeFile(this.path, JSON.stringify(this.products))
                console.log("Product updated!")
            } else {
                console.log("Product not found!")
            }
        }
        catch(error) {
            console.log(error)
        }
    }
}




    
    
    

    

    
    