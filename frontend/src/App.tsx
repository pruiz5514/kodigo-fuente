import { useEffect, useState } from "react"
import StatsSection from "./components/molecules/StatsSection"
import DiscountsTable from "./components/molecules/DiscountsTable"
import Pagination from "./components/molecules/Pagination"
import Header from "./components/organisms/Header"
import discountService from "./infrastructure/services/discount.service"
import type { Discount, Pagination as IPagination } from "./interfaces/discounts/get-discounts.interface"

function App() {
  const [discounts, setDiscounts] = useState<Discount[]>([])
  const [pagination, setPagination] = useState<IPagination | null>(null)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [isLoading, setIsLoading] = useState(false)

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
  }, [page, limit])

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
          <DiscountsTable discounts={discounts}/>
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
