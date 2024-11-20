import UserRepository from "../repositories/user.repository";
import { User } from "@prisma/client";

class UserService {
    private readonly userRepository : UserRepository

    constructor() {
        this.userRepository = new UserRepository()
    }

    async create(data: User) : Promise<User | null> {
        return this.userRepository.create(data)
    }
}

export default UserService