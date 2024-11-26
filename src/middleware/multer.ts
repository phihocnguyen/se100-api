import { Request } from 'express'
import multer from 'multer'

const storage = multer.diskStorage({
    filename: (req : Request, file: Express.Multer.File, cb : Function) => {
        cb(null, file.originalname)
    }
})

const upload = multer({storage: storage})
export default upload