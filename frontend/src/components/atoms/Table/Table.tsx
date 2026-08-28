interface ITableProps{
    children: React.ReactNode
}

const Table: React.FC<ITableProps> = ({children}) => {
  return (
    <table className="w-full text-black">
        {children}
    </table>
  )
}

export default Table