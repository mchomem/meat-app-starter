import * as jsonServer from 'json-server'
import { Express } from 'express'

import * as fs from 'fs'
import * as https from 'https'

import { handleAuthentication } from './auth' //middleware
import { handleAuthorization } from './authz' //middleware

const server: Express = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)
// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)

const options = {
    cert: fs.readFileSync('./backend/keys/cert.pem')
    , key: fs.readFileSync('./backend/keys/key.pem')
}

//middleware para login
server.post('/login', handleAuthentication)
server.use('/orders', handleAuthorization)

// Use default router
server.use(router)

const schema: string = 'https'
const url: string = 'localhost'
const port: number = 3001

https.createServer(options, server).listen(port, () => {
  console.log(`JSON Server is running on ${schema}://${url}:${port}`)
})
