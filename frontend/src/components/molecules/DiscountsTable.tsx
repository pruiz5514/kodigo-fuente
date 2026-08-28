import type { Discount } from "../../interfaces/discounts/get-discounts.interface"
import Table from "../atoms/Table/Table"
import TableContainer from "../atoms/Table/TableContainer"
import Thead from "../atoms/Table/Thead"
import Tbody from "../atoms/Table/Tbody"
import Th from "../atoms/Table/Th"
import Td from "../atoms/Table/Td"
import TrHead from "../atoms/Table/TrHead"
import TrBody from "../atoms/Table/TrBody"
import discountService from "../../infrastructure/services/discount.service"
import { confirmationAlert, successAlert, errorAlertOk } from "../../infrastructure/utils/alerts/alerts"
import { getApiErrorMessage } from "../../infrastructure/utils/get-api-error-message"

interface DiscountsTableProps {
  discounts: Discount[]
  onChanged?: () => void
}

const formatDate = (date: Discount["start_date"]) => {
  const [year, month, day] = String(date).split("-")
  return `${day}/${month}/${year}`
}

const formatValue = (discount: Discount) => {
  return discount.discount_type.name === "Porcentaje"
    ? `${Number(discount.discount_value)}%`
    : `$${Number(discount.discount_value).toLocaleString("es-CO")}`
}

const STATUS_FLOW: Record<string, string | null> = {
  Programado: "Activo",
  Activo: "Finalizado",
  Finalizado: null,
}

const getStatusOptions = (status: string): string[] => {
  const next = STATUS_FLOW[status]
  return next ? [status, next] : [status]
}

const DiscountsTable = ({ discounts, onChanged }: DiscountsTableProps) => {
  const handleDelete = async (discount: Discount) => {
    const confirmed = await confirmationAlert(
      '¿Eliminar promoción?',
      `Esta acción eliminará "${discount.name}" permanentemente.`
    )
    if (!confirmed) return

    try {
      await discountService.deleteDiscount(discount.id)
      successAlert('¡Listo!', 'La promoción se eliminó correctamente')
      onChanged?.()
    } catch (error) {
      console.error(error)
      errorAlertOk('Error', getApiErrorMessage(error))
    }
  }

  const handleStatusChange = async (discount: Discount, newStatus: string) => {
    if (newStatus === discount.status) return

    const confirmed = await confirmationAlert(
      '¿Cambiar estado?',
      `"${discount.name}" pasará de "${discount.status}" a "${newStatus}".`
    )
    if (!confirmed) return

    try {
      await discountService.updateDiscountStatus(discount.id, newStatus)
      successAlert('¡Listo!', 'El estado se actualizó correctamente')
      onChanged?.()
    } catch (error) {
      console.error(error)
      errorAlertOk('Error', getApiErrorMessage(error))
    }
  }

  return (
    <TableContainer>
      <Table>
        <Thead>
          <TrHead>
            <Th>Nombre</Th>
            <Th>Aplica a</Th>
            <Th>Tipo</Th>
            <Th>Valor</Th>
            <Th>Inicio</Th>
            <Th>Fin</Th>
            <Th>Estado</Th>
            <Th>Acciones</Th>
          </TrHead>
        </Thead>
        <Tbody>
          {discounts.length === 0 ? (
            <TrBody>
              <Td colSpan={8}>No hay promociones registradas</Td>
            </TrBody>
          ) : (
            discounts.map((discount) => (
              <TrBody key={discount.id}>
                <Td>{discount.name}</Td>
                <Td>{discount.category?.name ?? discount.product?.name}</Td>
                <Td>{discount.discount_type.name}</Td>
                <Td>{formatValue(discount)}</Td>
                <Td>{formatDate(discount.start_date)}</Td>
                <Td>{formatDate(discount.end_date)}</Td>
                <Td>
                  <select
                    value={discount.status}
                    disabled={discount.status === 'Finalizado'}
                    onChange={(e) => handleStatusChange(discount, e.target.value)}
                    className="border border-border-color rounded-lg px-2 py-1 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {getStatusOptions(discount.status).map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </Td>
                <Td>
                  <button
                    type="button"
                    className="text-red-500 font-medium hover:text-red-700 cursor-pointer"
                    onClick={() => handleDelete(discount)}
                  >
                    Eliminar
                  </button>
                </Td>
              </TrBody>
            ))
          )}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default DiscountsTable
