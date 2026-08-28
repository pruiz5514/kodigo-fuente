import CloseIcon from "../../assets/icons/CloseIcon"

interface ICloseModalButtonProps{
    onClick: ()=> void
}

const CloseModalButton: React.FC<ICloseModalButtonProps> = ({onClick}) => {
  return (
    <button onClick={onClick} className='bg-gray-200 h-11.25 flex gap-2 items-center justify-center font-medium text-[17px] px-4 rounded-xl'>
        <CloseIcon/> Cerrar
    </button>
  )
}

export default CloseModalButton