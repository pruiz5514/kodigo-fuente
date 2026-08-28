import { useEffect, useState } from "react"
import StatsSection from "./components/molecules/StatsSection"
import DiscountsTable from "./components/molecules/DiscountsTable"
import Pagination from "./components/molecules/Pagination"
import Header from "./components/organisms/Header"
import discountService from "./infrastructure/services/discount.service"
import type { Discount, Pagination as IPagination } from "./interfaces/discounts/get-discounts.interface"
import NewDiscount from "./components/organisms/NewDiscount"

function App() {
  const [discounts, setDiscounts] = useState<Discount[]>([])
  const [pagination, setPagination] = useState<IPagination | null>(null)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [isLoading, setIsLoading] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    const fetchDiscounts = async () => {
      setIsLoading(true)
      try {
        const response = await discountService.getDiscounts({ page, limit })
        setDiscounts(response.discounts)
        setPagination(response.pagination)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDiscounts()
  }, [page, limit, refreshKey])

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit)
    setPage(1)
  }

  return (
    <>
      <Header/>
      <main className="w-full flex justify-center py-12 px-8">
        <div className="w-full max-w-7xl flex flex-col gap-8">
          <StatsSection/>
          <NewDiscount onCreated={() => setRefreshKey((key) => key + 1)}/>
          <DiscountsTable discounts={discounts} onChanged={() => setRefreshKey((key) => key + 1)}/>
          {pagination && (
            <Pagination
              pagination={pagination}
              onPageChange={setPage}
              onLimitChange={handleLimitChange}
              isLoading={isLoading}
            />
          )}
        </div>
      </main>
    </>
  )
}

export default App
