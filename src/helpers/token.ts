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

    const verificationToken = await db.verifiedEmail.create(
        {
            data: {
                email,
                token
            }
        }
    )
    return verificationToken
}

export default generateVerificationToken