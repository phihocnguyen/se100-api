import { UserRole } from '@prisma/client'
import jwt from 'jsonwebtoken'
require('dotenv').config({path: '../../.env'})
export const generateAccessToken = (id : string, email: string, role: UserRole) : string => {
    return jwt.sign({id, email, role}, process.env.ACCESS_TOKEN as string)
}