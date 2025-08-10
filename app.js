import "./server.js"
import './routes/carts.js' 
import './routes/products.js' 
// import CartsService from "./services/CartsService.js"
// import ProductsService from "./services/ProductsService.js"

//entrega nro.1: /products y /carts,
//usando SRP, herencia y convención de nombres.
//Si bien la idea es testear mediante postman, a continuación hay datos de prueba para realizar unit tests a los servicios.

//  const serviceCarritos = new CartsService('./data/carts.json')
//  const serviceProductos = new ProductsService('./data/products.json')
//  const products = [{
//         title: "Producto 1",
//         description: "Descripción del producto 1",
//         price: 100,
//         code: "P001",
//         stock: 10,
//         category: "Categoría A",
//         thumbnails: ['thumb1.png']
//     },
//     {
//         title: "Producto 2",
//         description: "Descripción del producto 2",
//         price: 200,
//         code: "P002",
//         stock: 20,
//         category: "Categoría B",
//         thumbnails: []
//     },
//     {
//         title: "Producto 3",
//         description: "Descripción del producto 3",
//         price: 300,
//         code: "P003",
//         stock: 30,
//         category: "Categoría C",
//         thumbnails: []
//     }]

// serviceCarritos.post({ products: products });
// serviceCarritos.postProductInCart(1, 1, { quantity: 1 });
// serviceCarritos.postProductInCart(1, 2, { quantity: 2 });
// serviceCarritos.postProductInCart(1, 1, { quantity: 3 });
// serviceCarritos.getById(1);

// serviceProductos.post(productosPrueba[0]);
// serviceProductos.post(productosPrueba[1]);
// serviceProductos.post(productosPrueba[2]);

// serviceProductos.get();

// serviceProductos.getById(2);

// serviceProductos.put(2, {
//     title: "Producto 2 Modificado",
//     description: "Nueva descripción",
//     price: 250,
//     stock: 15
// });

// serviceProductos.delete(1);

// serviceProductos.get();
