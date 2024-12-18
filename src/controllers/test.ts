import db from "../config/db"

const addBrand = async (brand : string) => {
    await db.brand.create(
        {
            data: {
                categoryId: "cm4rw89xh0000atqh434la7b2",
                brandName: brand
            }
        }
    )
}
addBrand("Apple")
addBrand("Samsung")
addBrand("Oppo")
addBrand("Huawei")