import { useEffect, useState } from "react";
import StatsCard from "../atoms/StatsCard"
import discountService from "../../infrastructure/services/discount.service";
import type { Summary } from "../../interfaces/summary.interface";

const StatsSection = () => {
  const [summary, setSummary] = useState<Summary | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await discountService.getSummary();
        console.log(response)
        setSummary(response.summary);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSummary();
  }, []);

  const stats = [
    { title: "Programadas", value: summary?.scheduled ?? 0 },
    { title: "Activas", value: summary?.active ?? 0 },
    { title: "Finalizadas", value: summary?.finished ?? 0 },
    { title: "Activas hoy", value: summary?.activeToday ?? 0 },
  ];

  return (
    <div className="flex flex-wrap gap-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} title={stat.title} value={stat.value} />
        ))}
    </div>
  )
}

export default StatsSection
