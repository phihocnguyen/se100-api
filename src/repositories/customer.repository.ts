import { User } from "@prisma/client";
import db from "../config/db";
import v2Cloudinary from "../utils/cloudinary";

class UserRepository {
    async create(data : User, file : Express.Multer.File | undefined) : Promise<User | null> {
        let url = ''
        await v2Cloudinary.uploader.upload(file!.path, (err, result) => {
            if (err) {
                return null
            }
            else {
                url = result!.url
            }
        })
        return db.user.create(
            {
                data: {
                    ...data,
                    image: url
                }
            }
        )
        
    }
    async findByEmail(email: string): Promise<User | null> {
    return db.user.findFirst(
        {
            where: {
                email
            }
        }
    )
  }

}

export default UserRepository