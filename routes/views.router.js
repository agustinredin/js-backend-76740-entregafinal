import { Router } from "express";

const BASE_URL = 'http://localhost:8080/api'
const router = Router();

router.get('/', async (req, res) => {
    const products = await fetch(BASE_URL + '/products').then(res => res.json());
    res.render('index', { title: "Entrega Final", products: products.docs });
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