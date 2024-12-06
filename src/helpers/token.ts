import db from "../config/db"
import {v4 as uuidv4} from 'uuid'

const generateVerificationToken = async (email : string) => {
    const token = uuidv4()
    const existingToken = await db.verifiedEmail.findFirst(
        {
            where: {
                email
            }
        }
    )
    if (existingToken) {
        await db.verifiedEmail.delete({
            where: {
                id: existingToken.id
            }
        })
    }

    const user = await db.user.findFirst({
        where: {
            email
        }
    })

    if (!user) {
        throw new Error("User not found");
    }

    const verificationToken = await db.verifiedEmail.create(
        {
            data: {
                email,
                token,
                userId: user.id
            }
        }
    )
    return verificationToken
}

export default generateVerificationToken