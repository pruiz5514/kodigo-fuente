import type { IDiscounts } from "../../interfaces/discounts/get-discounts.interface";
import type { ISummary } from "../../interfaces/summary.interface";
import { apiClient } from "../utils/api-client";

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
}

const discountService = new DiscountService();
export default discountService;
