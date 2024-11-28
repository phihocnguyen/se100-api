import { Request, Response, NextFunction } from "express";

interface Error {
  statusCode: number | 500,
  status : string | "error"
  message: string
} 

const errorHandler = (error: Error, req : Request, res : Response, next : NextFunction) => {
    error.statusCode = error.statusCode || 500
    error.status = error.status || "error"
    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message
    })
}
export default errorHandler