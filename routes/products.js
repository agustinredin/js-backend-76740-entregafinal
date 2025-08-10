import server from "../server.js";
import ProductsService from "../services/ProductsService.js";
debugger
const routePrefix = "/api/products";
const path = "./data/products.json";
const service = new ProductsService(path);

server.get(routePrefix, (_, res) => {
    try {
        res.status(200).json(service.get());
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

server.get(routePrefix + "/:pid", (req, res) => {
    try {
        const { pid } = req.params
        res.status(200).json(service.getById(pid));
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

server.post(routePrefix, (req, res) => {
    try {
        const obj = req.body
        if (typeof (obj) != 'object') throw new Error("Datos en formato incorrecto")
        res.status(200).json(service.post(obj))
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

server.put(routePrefix + "/:pid", (req, res) => {
    try {
        const { pid } = req.params
        res.status(200).json(service.put(pid))
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

server.delete(routePrefix + "/:pid", (req, res) => {
    try {
        const fields = req.body
        if(fields['id']) throw new Error("El ID del producto no se puede modificar.")
        res.status(200).json(service.put(pid, fields))
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})
