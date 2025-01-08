import { GoogleGenerativeAI } from "@google/generative-ai"
import dotenv from 'dotenv'
dotenv.config()

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY as string)
const searchAPI = async (demand: string)=> {
        const model = genAI.getGenerativeModel({model: 'gemini-pro'})
        const prompt = 
            `Bạn là nhân viên của cửa hàng bán đồ công nghệ E-ShopHub
            Đường dẫn host: http://localhost:5173/listproduct/:category, category thuộc ['Laptop', 'Phone', 'Tablet', 'Earpods', 'Accessories']
            Khách hỏi: ${demand}
            `
        const result = await model.generateContent(prompt)
        const response = await result.response
        const text = response.text()
        return text
}

export default searchAPI