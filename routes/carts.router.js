import { Router } from "express";
import { CartModel } from "../models/cart.model.js";
import { ProductModel, productSchema } from "../models/product.model.js"

const router = Router();

router.get("/:cid", async (req, res) => {
    try {
        const { cid } = req.params
        let cart = await CartModel.findById(cid).populate('products.product')
        res.status(200).json(cart);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        if (typeof req.body != 'object') throw new Error("Datos en formato incorrecto")
        const { cart } = req.body

        const postedCart = (await CartModel.create({cart})).populate('products.product')

        res.status(200).json(postedCart)
    } catch (err) {
        res.status(400).json({ status: "error", payload: { message: err.message } });
    }
})

router.post('/:cid/products/:pid', async (req, res) => {
    try {
      const { cid = '0' , pid } = req.params;
      const product = await ProductModel.findById(pid).lean();
      if (!product) {
        return res.status(404).json({ status: 'error', message: `El producto con ID ${pid} no existe.` });
      }

      let cart = cid != '0' ? await CartModel.findById(cid) : null;
      if (!cart) {
        cart = await CartModel.create({products: [
            {
                product
            }
        ]
        ,quantity: 1})
      }

      const existing = cart.products.find(p => p.product.code === product.code);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.products.push({ product: product, quantity: 1 });
      }

  
      const saved = await cart.save();
      return res.status(200).json({ status: 'success', payload: saved });
    } catch (err) {
        console.log(err)
      return res.status(400).json({ status: 'error', payload: { message: err.message } });
    }
});

router.delete('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        let cart = await CartModel.findById(cid);
        if (!cart) {
            throw new Error('Carrito ' + cid + ' no encontrado.')
        } 

        cart.products = []

        const saved = await cart.save()

        return res.status(200).json({ status: 'success', payload: {saved}});
      } catch (err) {
          console.log(err)
        return res.status(400).json({ status: 'error', payload: { message: err.message } });
      }
})

router.delete('/:cid/products/:pid', async (req, res) => {
    try {
    const { cid , pid } = req.params;
    const product = await ProductModel.findById(pid).lean();
    if (!product) {
      return res.status(404).json({ status: 'error', message: `El producto con ID ${pid} no existe.` });
    }

    let cart = await CartModel.findById(cid);
    if (!cart) {
        throw new Error('Carrito ' + cid + ' no encontrado.')
    } 


    const existing = cart.products.find(p => p.product.code === product.code);
    if (existing) {
      cart.products = cart.products.filter(p => p.product.code != product.code)
    } else {
        throw new Error('El producto ' + pid + ' no está en el carrito ' + cid + '.')
    }


    const saved = await cart.save();
    return res.status(200).json({ status: 'success', payload: saved });
  } catch (err) {
      console.log(err)
    return res.status(400).json({ status: 'error', payload: { message: err.message } });
  }
})

router.put('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const { products } = req.body
        let cart = await CartModel.findById(cid);
        if (!cart) {
            throw new Error('Carrito ' + cid + ' no encontrado.')
        } 

        cart.products = products

        const saved = await cart.save()

        return res.status(200).json({ status: 'success', payload: {saved}});
      } catch (err) {
          console.log(err)
        return res.status(400).json({ status: 'error', payload: { message: err.message } });
      }
})

router.put('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        let cart = await CartModel.findById(cid);
        if (!cart) {
            throw new Error('Carrito ' + cid + ' no encontrado.')
        } 

        const product = await ProductModel.findById(pid).lean();
        if (!product) {
          return res.status(404).json({ status: 'error', message: `El producto con ID ${pid} no existe.` });
        }
    
        const existing = cart.products.find(p => p.product.code === product.code);
        if (existing) {
          existing.quantity = quantity
        } else {
            throw new Error('El producto ' + pid + ' no está en el carrito ' + cid + '.')
        }


        const saved = await cart.save()

        return res.status(200).json({ status: 'success', payload: {saved}});
      } catch (err) {
          console.log(err)
        return res.status(400).json({ status: 'error', payload: { message: err.message } });
      }
})


export default router;