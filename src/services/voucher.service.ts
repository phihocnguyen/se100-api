import { Voucher } from "@prisma/client";
import VoucherRepository from "../repositories/voucher.repository";

class VoucherService {
    private readonly voucherRepository: VoucherRepository

    constructor() {
        this.voucherRepository = new VoucherRepository()
    }

    async create(data: Voucher): Promise<Voucher | null> {
        return this.voucherRepository.create(data)
    }
    async getVouchers(): Promise<Voucher[] | null> {
        const result = await this.voucherRepository.getVouchers()
        return result
    }

    async edit(id: string, data: Voucher): Promise<Voucher | null> {
        const result = await this.voucherRepository.edit(id, data)
        return result
    }
    async delete(id: string): Promise<boolean> {
        const result = await this.voucherRepository.delete(id)
        return result
    }
    async isInRange(name: string, currentDate: Date): Promise<Voucher | null> {
        await this.voucherRepository.isInRange(name, currentDate)
    }

}

export default VoucherService