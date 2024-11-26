import UserRepository from "../repositories/user.repository";
import { User } from "@prisma/client";

class UserService {
    private readonly userRepository : UserRepository

    constructor() {
        this.userRepository = new UserRepository()
    }

    async create(data: User, file : Express.Multer.File | undefined) : Promise<User | null> {
        return this.userRepository.create(data, file)
    }
}

export default UserService