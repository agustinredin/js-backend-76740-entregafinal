import mongoose from 'mongoose';
import { productSchema } from './product.model.js';
import mongoosePaginate from 'mongoose-paginate-v2';

const cartSchema = new mongoose.Schema({
    products: [{
        product: {
            type: productSchema,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1
        }
    }]
})

cartSchema.plugin(mongoosePaginate)

export const CartModel = mongoose.model('Cart', cartSchema)