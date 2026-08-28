// components/atoms/Table/Td.tsx
import React from 'react'

interface ITdProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  width?: string
  children: React.ReactNode
  py?:string;
  px?: string
}

const Td: React.FC<ITdProps> = ({
  children,
  width = '',
  className = '',
  colSpan,
  ...rest
}) => {
  return (
    <td
      {...(colSpan ? { colSpan } : {})}
      className={[
        'py-4 px-[15px]',
        width,
        'text-[15px] text-black border-t border-border-color',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </td>
  )
}

export default Td
