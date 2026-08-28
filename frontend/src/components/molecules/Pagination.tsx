import SpinnerFull from "../atoms/SpinnerFull"
import LeftChevron from "../../assets/icons/LeftChevron"
import RightChevron from "../../assets/icons/RightChevron"
import type { Pagination as IPagination } from "../../interfaces/discounts/get-discounts.interface"

interface IPaginationProps {
  pagination: IPagination
  onPageChange: (page: number) => void
  onLimitChange: (limit: number) => void
  isLoading?: boolean
}

const Pagination = ({ pagination, onPageChange, onLimitChange, isLoading }: IPaginationProps) => {
  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onLimitChange(Number(e.target.value))
  }

  return (
    <>
      <div className="flex items-center gap-4 w-full justify-between md:justify-end">
        <div>
          <span>Por página: </span>
          <select value={pagination.limit} onChange={handleLimitChange}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
        <div className="h-[48px] px-4 bg-border-color flex items-center rounded-[10px] gap-3">
          {pagination.currentPage > 1 && (
            <button className="cursor-pointer" onClick={() => onPageChange(pagination.currentPage - 1)}>
              <LeftChevron />
            </button>
          )}
          <span>Página {pagination.currentPage}/{pagination.totalPages}</span>
          {pagination.currentPage < pagination.totalPages && (
            <button className="cursor-pointer" onClick={() => onPageChange(pagination.currentPage + 1)}>
              <RightChevron />
            </button>
          )}
        </div>
      </div>

      {isLoading && <SpinnerFull />}
    </>
  )
}

export default Pagination
