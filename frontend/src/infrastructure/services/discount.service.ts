import type { ISummary } from "../../interfaces/summary.interface";
import { apiClient } from "../utils/api-client";

class DiscountService{
    async getSummary(): Promise<ISummary> {
        return apiClient.get<ISummary>("discount/summary");
    }
}

const discountService = new DiscountService();
export default discountService;
