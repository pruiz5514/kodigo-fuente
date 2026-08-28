interface ITrTrHeadProps{
    children: React.ReactNode
    bg? :string
}

const TrHead: React.FC<ITrTrHeadProps> = ({children, bg}) => {
  return (
    <tr className={`w-full ${bg}`}>
        {children}
    </tr>
  )
}

export default TrHead