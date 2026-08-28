// components/atoms/Table/TableContainer.tsx
import React from 'react'

interface ITableContainerProps {
  children: React.ReactNode
}

const TableContainer: React.FC<ITableContainerProps> = ({ children }) => (
  <div className="w-full  overflow-x-auto bg-white border border-gray-200 rounded-[14px]">
    {children}
  </div>
)

export default TableContainer