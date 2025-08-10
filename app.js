import express from 'express'
import handlebars from 'express-handlebars'
import mongoose from 'mongoose'
import viewsRouter from './routes/views.router.js'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import rateLimit from 'express-rate-limit'
import { Server } from 'socket.io'

process.loadEnvFile()
const app = express()
const port = 8080

mongoose.connect(process.env.MONGO_URI).then((db) => {
    console.log('Conectado a MongoDB @:', db.connection.host)
}).catch((err) => {
    console.log('Error al conectar a MongoDB:', err)
})

app.use(express.json())

//rate limit para evitar spam
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100,                 
    standardHeaders: 'draft-7',
    legacyHeaders: false,      
    message: { error: 'Too many requests' }
  });
  
app.use(limiter);

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.static('./public'));

app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

const server = app.listen(port)
const io = new Server(server)

let cid = 0;
io.on('connection', (socket) => {
    console.log('WebSocket conn activa!')

    socket.on('getActiveCart', () => {
        socket.emit('activeCart', cid)
    })

    socket.on('setActiveCart', (idNuevo) => {
        cid = idNuevo
        socket.emit('activeCart', cid)
    })
})