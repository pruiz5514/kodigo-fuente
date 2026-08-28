interface ITrTrBodyProps{
    children: React.ReactNode
    onClick?: ()=>void;
    bg?: string
}

const TrBody: React.FC<ITrTrBodyProps> = ({children, onClick, bg}) => {
  return (
    <tr onClick={onClick} className={`w-full ${bg}`}>
        {children}
    </tr>
  )
}

export default TrBody