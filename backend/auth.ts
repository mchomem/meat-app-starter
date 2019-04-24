import { Request, Response } from 'express'
import { User, users } from './users'

import * as jwt from 'jsonwebtoken' // Lib to process a tokens
import { apiConfig } from './api-config'

// Código pra processar um post para o login
export const handleAuthentication = (req: Request, resp: Response) => {
    const user: User = req.body
    if(isValid(user)) {
        const dbUser = users[user.email]
        
        //Uso de um token
        const token = jwt.sign({sub: dbUser.email, iss: 'meat-api'}, apiConfig.secret)
        resp.json({name: dbUser.name, email: dbUser.email, accessToken: token})

    } else {
        resp.status(403).json({message: 'Dados inválidos.'})
    }
}

function isValid(user: User): boolean {
    if(!user) {
        return false
    }
    
    const dbUser = users[user.email]
    return dbUser !== undefined && dbUser.matches(user)
}

