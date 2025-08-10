import express from 'express'

const server = express()
const port = 8080

server.use(express.json())
server.listen(port)


console.log('Server running in port:', port)


export default server