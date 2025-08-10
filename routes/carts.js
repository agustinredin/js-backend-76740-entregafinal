import server from "../server.js";
import CartsService from "../services/CartsService.js";

const routePrefix = "/api/carts";
const path = "./data/carts.json";
const service = new CartsService(path);

server.post(routePrefix, (req, res) => {
    try {
        const obj = req.body
        if (typeof (obj) != 'object') throw new Error("Datos en formato incorrecto")
        res.status(200).json(service.post(obj))
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})


server.get(routePrefix + "/:cid", (req, res) => {
    try {
        const { cid } = req.params
        res.status(200).json(service.getById(cid));
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


server.post(routePrefix + "/:cid/product/:pid", (req, res) => {
    try {
        const { cid, pid } = req.params
        const obj = req.body
        res.status(200).json(service.postProductInCart(cid,pid,obj))
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
