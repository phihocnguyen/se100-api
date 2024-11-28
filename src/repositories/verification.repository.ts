import db from "../config/db"

interface tokenType {
    email: string,
    token: string,
}

class VerifcationRepository {
    async getTokenByToken(token : string) : Promise<tokenType | null> {
        const existingToken : (tokenType | null) = await db.verifiedEmail.findFirst({
            where: {
                token
            },
            select: {
                email: true,
                token: true
            }
        })
        return existingToken
    }
}

export default VerifcationRepository