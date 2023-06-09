const fs = require("fs");
class ProductManager {
    constructor (){
        this.products = []
        this.index = 0
        this.path = "./productos.json"
        fs.writeFileSync(this.path, JSON.stringify(this.products, null , "\t") )
    }

    getProducts = () =>{
        const productsList =  fs.readFileSync(this.path, "utf-8")
        return(productsList); 
    }
    
    getProductByID =(id)=>{
    
    const lista = JSON.parse(fs.readFileSync(this.path, "utf-8")) ;
    
    const found = lista.find(e=> e.id === id)
    found === undefined ? console.log("Not Found") : console.log(found);     
        
    }
    
    
    
    addProduct = (title,description,price,thumbnail,code,stock) =>{
        this.index++
        const id = this.index
        
        const product ={ id,title,description,price,thumbnail,code,stock}

        if (this.products.some(i => i.code === code)){
            console.log("Codigo repetido");
        } else if(!description || !title || !price || !thumbnail || !code || !stock ){
            console.log("faltan datos");
        }else{
            this.products.push(product)
            fs.writeFileSync(this.path, JSON.stringify(this.products, null , "\t") )
            
        }

        
    }

    updateProduct = (id, campo, cambio)=>{
        const lista = JSON.parse(fs.readFileSync(this.path, "utf-8")) ;
        const cambiar = lista.findIndex(obj=>obj.id === id)
        cambiar.campo = cambio
        const updateList = JSON.stringify(lista);
        fs.writeFileSync(this.path, updateList)
    }

    deleteProduct = (id) =>{
        const lista = JSON.parse(fs.readFileSync(this.path, "utf-8")) ;
        const borrar = lista.findIndex(obj=>obj.id === id)
        lista.splice(borrar, 1);
        const updateList =JSON.stringify(lista);
        fs.writeFileSync(this.path, updateList)
    }
}

const manager = new ProductManager()
try {
    manager.addProduct('producto prueba', 'Esto es un producto prueba', 200, 'imagen', '12345', 20)
    manager.addProduct('producto prueba', 'Esto es un producto prueba', 200, 'imagen', '12345', 20)
} catch (error) {
    console.log(error.message)
}
console.log(manager.getProducts())
console.log('El producto que buscaste según el ID es:', manager.getProductById(2))




