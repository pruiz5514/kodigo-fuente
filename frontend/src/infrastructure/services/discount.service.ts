import type { Discount, IDiscounts } from "../../interfaces/discounts/get-discounts.interface";
import type { ISummary } from "../../interfaces/summary.interface";
import type { ICreateDiscount } from "../../interfaces/discounts/create-discount.dto";
import { apiClient } from "../utils/api-client";

interface ICreateDiscountResponse {
    ok:       boolean;
    discount: Discount;
}

class DiscountService{
    async getSummary(): Promise<ISummary> {
        return apiClient.get<ISummary>("discount/summary");
    }

    async getDiscounts(params?: { page?: number; limit?: number }): Promise<IDiscounts> {
        const query = new URLSearchParams();
        if (params?.page) query.set("page", String(params.page));
        if (params?.limit) query.set("limit", String(params.limit));

        const queryString = query.toString();
        return apiClient.get<IDiscounts>(`discount${queryString ? `?${queryString}` : ""}`);
    }

    async createDiscount(data: ICreateDiscount): Promise<ICreateDiscountResponse> {
        return apiClient.post<ICreateDiscountResponse, ICreateDiscount>("discount", data);
    }
}

const discountService = new DiscountService();
export default discountService;
