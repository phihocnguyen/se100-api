import { User } from "@prisma/client";
import db from "../config/db";

class UserRepository {
    async create(data : User) : Promise<User | null> {
        return db.user.create(
            {
                data: {
                    ...data
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