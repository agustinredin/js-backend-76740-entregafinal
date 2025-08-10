import fs from "fs";
import ServiceBase from "./ServiceBase.js";

class CartsService extends ServiceBase {
    constructor(route) {
        super(route, 'carts')
    }

    post(obj) {
        let data = JSON.parse(this.fileContent);
        let newCart = { ...obj, id: data.carts.length + 1 };
        data.carts.push(newCart);

        let jsonObj = {
            carts: data.carts,
        };

        fs.writeFileSync(this.path, JSON.stringify(jsonObj));
        this.fileContent = fs.readFileSync(this.path, { encoding: "utf-8" });
        return jsonObj;
    }

    getById(cid) {
        let data = JSON.parse(this.fileContent);
        console.log(data)
        if (!data || !data.carts || !Array.isArray(data.carts) || !data.carts.length)
            throw new Error("No hay carritos guardados para mostrar.");
        
        const cart = data.carts.filter((c) => c.id == cid);
        if (!cart) throw new Error(`El carrito con ID ${cid} no existe.`);
        return cart;
    }

    postProductInCart(cid, pid, obj) {
        let data = JSON.parse(this.fileContent)
        let cart = data.carts.filter((c) => c.id == cid)

        if (!cart) throw new Error(`El carrito con ID ${cid} no existe.`);

        let products = cart.products ?? []
        let { quantity } = obj 

        let product = products.filter(prod => prod.id == pid)

        if (product) {
            product.quantity += quantity ?? 1
        }
        else {
            product = {
                id: pid,
                quantity: quantity ?? 1
            }
            cart.products.push(product)
        }

        let jsonObj = {
            carts: data.carts,
        };

        fs.writeFileSync(this.path, JSON.stringify(jsonObj));
        this.fileContent = fs.readFileSync(this.path, { encoding: "utf-8" });
        return jsonObj;
    }
}

export default CartsService;
