import { Router } from "express";

const BASE_URL = 'http://localhost:8080/api'
const router = Router();

router.get('/', async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10
    const page = req.query.page ? parseInt(req.query.page) : 1
    const sort = req.query.sort == 'desc' ? {price: -1} : {price: 1}
    
    const query = req.query.query ? JSON.parse(req.query.query) : {}
    const urlQuery = '?limit=' + limit + '&sort=' + (sort.price ? 'asc' :'desc') + '&query=' + JSON.stringify(query) + '&page=' + page

    const products = await fetch(BASE_URL + '/products' + urlQuery).then(res => res.json());
    res.render('index', { title: "Entrega Final", products: products.docs, nextLink: products.nextLink, prevLink: products.prevLink });
});

router.get('/products/:pid', async (req, res) => {
    const { pid } = req.params;
    const product = await fetch(BASE_URL + '/products/' + pid).then(res => res.json());
    res.render('product-detail', { product });
});

router.get('/carts/:cid', async (req, res) => {
    const { cid } = req.params
    const cart = await fetch(BASE_URL + '/carts/' + cid).then(res => res.json())
    res.render('cart-detail', { cart })
})

export default router;