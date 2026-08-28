import type { Discount } from "../../interfaces/discounts/get-discounts.interface"
import Table from "../atoms/Table/Table"
import TableContainer from "../atoms/Table/TableContainer"
import Thead from "../atoms/Table/Thead"
import Tbody from "../atoms/Table/Tbody"
import Th from "../atoms/Table/Th"
import Td from "../atoms/Table/Td"
import TrHead from "../atoms/Table/TrHead"
import TrBody from "../atoms/Table/TrBody"

interface DiscountsTableProps {
  discounts: Discount[]
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

const DiscountsTable = ({ discounts }: DiscountsTableProps) => {
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
          </TrHead>
        </Thead>
        <Tbody>
          {discounts.length === 0 ? (
            <TrBody>
              <Td colSpan={7}>No hay promociones registradas</Td>
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
                <Td>{discount.status}</Td>
              </TrBody>
            ))
          )}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default DiscountsTable
