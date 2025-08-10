import { Router } from "express";
import { ProductModel } from "../models/product.model.js";

const BASE_URL = 'http://localhost:8080/api'
const router = Router();

router.get('/', async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : 10
        const page = req.query.page ? parseInt(req.query.page) : 1
        const sort = req.query.sort == 'desc' ? {price: -1} : {price: 1}
        
        const query = req.query.query ? JSON.parse(req.query.query) : {}
        if(Object.keys(query).length && !Object.keys(query).includes('category') && !Object.keys(query).includes('stock'))
            throw new Error("Solo se puede buscar productos por disponibilidad o por categoria")

        if (limit > 20) 
            throw new Error("El límite máximo en una sola consulta es de 20 productos")



        const result = await ProductModel.paginate(query, { limit, page, sort });
        
        
        const url = '?limit=' + limit + '&sort=' + (sort.price ? 'asc' :'desc') + '&query=' + JSON.stringify(query)
        const resultNextPrev = {
            ...result,
            status: "success",
            prevLink: result.hasPrevPage ? `${url}&page=${result.prevPage}` : null,
            nextLink: result.hasNextPage ? `${url}&page=${result.nextPage}` : null,
        }
        res.status(200).json(resultNextPrev);
    } catch (err) {
        res.status(400).json({ status: "error", payload: { message: err.message } });
    }
});

router.get('/:pid', async (req, res) => {
    try {
        const { pid } = req.params
        const product = await ProductModel.findById(pid);
        res.status(200).json(product);
    } catch (err) {
        res.status(400).json({ status: "error", payload: { message: err.message } });
    }
});

router.post('/', async (req, res) => {
    try {
        if (typeof req.body != 'object') throw new Error("Datos en formato incorrecto")
        const { product } = req.body

        const postedProduct = await ProductModel.create(product)

        res.status(200).json(postedProduct)
    } catch (err) {
        res.status(400).json({ status: "error", payload: { message: err.message } });
    }
})

export default router;